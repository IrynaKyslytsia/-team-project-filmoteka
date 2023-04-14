// Просьба добавить в индекс html в боди   <include src="./partials/pagination.html"></include>
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const API = new APIservice();


export function getPageFilms(ids, itemsPerPage, currentPage) {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
  
    return ids.slice(start, end);
};

export function createLibraryPagination(items, renderFn, totalItems) {
    const container = document.getElementById('pagination');
    const itemsPerPage = 20;
    const options = {
      totalItems: totalItems || items.length,
      itemsPerPage,
      visiblePages: 4,
      centerAlign: false,
    };
}    
const pagination = new Pagination(container, options);

  pagination.on('beforeMove', event => {
    renderFn(getPageFilms(items, itemsPerPage, event.page - 1));
  });

  pagination.movePageTo(0);


export function createHomePagination(renderFn) {
  const container = document.getElementById('pagination');
  const itemsPerPage = 20;
  const options = {
    totalItems: 200,
    itemsPerPage,
    visiblePages: 4,
    centerAlign: false,
  };

  API
    .fetchTrending(true)
    .then(data => {
      renderFn(getPageFilms(data.results, itemsPerPage, 0));
    })
    .catch(console.log);

  const pagination = new Pagination(container, options);

  pagination.on('beforeMove', event => {
    API.page = event.page;
    API
      .fetchTrending(true)
      .then(data => {
        renderFn(data.results);
      })
      .catch(console.log);
  });

  pagination.movePageTo(0);
}