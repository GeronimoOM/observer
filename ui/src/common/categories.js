export const Categories = [
  {"id":1,"name":"Политика","url":"politics"},
  {"id":2,"name":"Экономика","url":"economics"},
  {"id":3,"name":"Здоровье","url":"health"},
  {"id":4,"name":"Спорт","url":"sport"},
  {"id":5,"name":"Культура","url":"culture"},
  {"id":6,"name":"Общество","url":"society"}
]

export function categoryByUrl(url) {
  return Categories.find(cat => cat.url === url)
}

export function categoryIdByUrl(url) {
 const category = categoryByUrl(url)
 return category ? category.id : undefined
}