export const Card = (title, data) => {
  return `
    <div class="card">
      <h4 class="card__title">${title}</h4>
      <div class="card-wrapper">
        <h5 class="card-wrapper__info">${data}</h5>
      </div>
    </div>
  `;
};
