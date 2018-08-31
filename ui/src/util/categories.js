export function categoryByUrl(categories, url) {
  return categories.find(cat => cat.url === url);
}