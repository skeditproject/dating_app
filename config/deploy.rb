# config valid for current version and patch releases of Capistrano
lock "~> 3.19.1"

# require 'capistrano-db-tasks'

set :repo_url,        'https://github.com/skeditproject/dating_app'
set :application,     'dating_app'
set :user,            'deploy'
set :puma_threads,    [4, 16]
set :puma_workers,    2
# Don't change these unless you know what you're doing
set :pty,             true
set :use_sudo,        false
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :rvm_ruby_version, '3.2.2'
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_rackup,     "#{release_path}/config.ru"
set :puma_access_log, "#{release_path}/log/puma.access.log"
set :puma_error_log,  "#{release_path}/log/puma.error.log"
set :output,          "#{release_path}/log/cron.log"
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/id_rsa) }
set :puma_preload_app, true
set :puma_worker_timeout, 120
set :puma_init_active_record, true  # Change to false when not using ActiveRecord
set :rails_env, "production"
set :assets_dependencies, %w(app/assets lib/assets vendor/assets Gemfile.lock config/routes.rb)
set :nginx_server_name, "shyou.skedgroup.com"
set :nginx_use_ssl, true
# set :nginx_ssl_certificate, "/etc/letsencrypt/live/preciousinfosystem.com/fullchain.pem"
# set :nginx_ssl_certificate_key, "/etc/letsencrypt/live/preciousinfosystem.com/privkey.pem"

#set :puma_enable_socket_service, true
## Defaults:
# set :scm,           :git
set :branch, 'master'
# set :format,        :pretty
# set :log_level,     :debug
set :keep_releases, 2

## Linked Files & Directories (Default None):
# set :linked_files, %w{config/database.yml}
# set :linked_dirs,  %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}
append :linked_dirs, 'log', 'tmp/pids', 'tmp/sockets'

set :linked_files, %w{config/master.key config/database.yml}
append :linked_dirs, 'log', 'storage', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'public/system', 'public/uploads', 'node_modules'
set :linked_dirs,  %w{log tmp/pids tmp/sockets}

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc "Make sure local git is in sync with remote."
  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/#{fetch(:branch)}`
        puts "WARNING: HEAD is not the same as origin/#{fetch(:branch)}"
        puts "Run git push to sync changes."
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  before :starting,     :check_revision
  after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
  after  :finishing,    :restart
end
