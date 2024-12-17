require "faker"

40.times do
  User.create(
    first_name: Faker::Name.first_name,
    dob_day: Faker::Number.within(range: 1..30),
    dob_month: Faker::Number.within(range: 1..12),
    dob_year: Faker::Number.within(range: 1980..2000),
    show_gender: Faker::Boolean.boolean,
    gender_identity: %w[man woman non-binary].sample,
    show_sexual_orientation: Faker::Boolean.boolean,
    sexual_orientation: %w[straight gay bisexual queer asexual].sample,
    gender_interest: %w[man woman both].sample,
    email: Faker::Internet.unique.email,
    url1: Faker::Avatar.image(slug: "user-avatar", size: "300x300", format: "png"),
    about: Faker::Lorem.sentence,
    password: "123456",
    password_confirmation: "123456"
  )
end
