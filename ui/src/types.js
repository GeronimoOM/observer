import PropTypes from 'prop-types'

export const Category = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
})

export const Author = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string.isRequired
})

export const Post = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  category: Category.isRequired,
  author: Author,
  added: PropTypes.instanceOf(Date),
  image: PropTypes.string
})


