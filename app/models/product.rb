class Product < ApplicationRecord
  validates :name, :price, :quantity, presence: true
  validates :price, numericality: { greater_than: 0 }
  validates :quantity, numericality: { greater_than: 0, less_than: 100, only_integer: true }
end
