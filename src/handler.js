const { nanoid } = require('nanoid')
const books = require('./books')
const {
  findSuccess,
  getAllBook,
  getFilteredBookByName,
  getFinishedBooks,
  getReadingbooks
} = require('./lib/library')
const addBooksHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }
  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const newNote = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: pageCount === readPage,
    insertedAt,
    updatedAt
  }
  books.push(newNote)
  const isSuccess = findSuccess(books, id)
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllBookHandler = (request, h) => {
  const { reading, name, finished } = request.query
  if (reading) {
    const bookRead = getReadingbooks(books, reading)
    const response = h.response({
      status: 'success',
      data: {
        books: bookRead
      }
    })
    response.code(200)
    return response
  }
  if (finished) {
    const bookFinished = getFinishedBooks(books, finished)
    const response = h.response({
      status: 'success',
      data: {
        books: bookFinished
      }
    })
    response.code(200)
    return response
  }
  if (name) {
    const bookFilteredByName = getFilteredBookByName(books, name)
    const response = h.response({
      status: 'success',
      data: {
        books: bookFilteredByName
      }
    })
    response.code(200)
    return response
  }
  const book = getAllBook(books)
  const response = h.response({
    status: 'success',
    data: {
      books: book
    }
  })
  response.code(200)
  return response
}
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params

  const book = books.filter((book) => book.id === bookId)[0]

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}
const editBooksByIdHandler = (request, h) => {
  const { bookId } = request.params

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }
  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}
const deleteBooksByIdHandler = (request, h) => {
  const { bookId } = request.params

  const index = books.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    books.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}
module.exports = {
  addBooksHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandler
}
