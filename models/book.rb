# Models
class Book
  include Mongoid::Document

  field :title, type: String
  field :author, type: String
  field :isbn, type: String

  validates :title, presence: true
  validates :author, presence: true
  validates :isbn, presence: true

  index({ title: "text" })
  index({ isbn: 1 }, { unique: true, name: "isbn_index" })

  scope :title, ->(title) { where(title: /^#{title}/) }
  scope :isbn, ->(isbn) { where(isbn: isbn) }
  scope :author, ->(author) { where(author: author) }
end

# Serializers
class BookSerializer
  def initialize(book)
    @book = book
  end

  def as_json(*)
    data = {
      id: @book.id.to_s,
      title: @book.title,
      author: @book.author,
      isbn: @book.isbn,
    }
    data[:errors] = @book.errors if @book.errors.any?
    data
  end
end
