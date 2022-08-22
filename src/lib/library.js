// find index
const findIndex = () => {}
const findSuccess = (books, id) => {
  return books.filter((book) => book.id === id).length > 0
}
const getReadingbooks = (books, reading) => {
  return books
    .filter((book) => {
      // eslint-disable-next-line eqeqeq
      return book.reading == reading
    })
    .map((item, index) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher
      }
    })
}
const getFinishedBooks = (books, finished) => {
  return books
    .filter((book) => {
      // eslint-disable-next-line eqeqeq
      return book.finished == finished
    })
    .map((item, index) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher
      }
    })
}
const getFilteredBookByName = (books, name) => {
  return books
    .filter((book) => {
      // eslint-disable-next-line eqeqeq
      const lowerBook = book.name.toLowerCase()
      return lowerBook.includes(name.toLowerCase())
    })
    .map((item, index) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher
      }
    })
}
const getAllBook = (books) => {
  return books.map((item, index) => {
    return {
      id: item.id,
      name: item.name,
      publisher: item.publisher
    }
  })
}

module.exports = {
  findIndex,
  findSuccess,
  getAllBook,
  getFilteredBookByName,
  getFinishedBooks,
  getReadingbooks
}
