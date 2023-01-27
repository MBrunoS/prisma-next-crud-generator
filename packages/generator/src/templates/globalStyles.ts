export const css = `
:root {
  --primary-color: #5a67d8;
  --primary-color-hover: #2c3aba;
  --danger-color: #ef4444;
  --background-color: #f6f6f6;
  --text-color: #333;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--background-color);
  color: var(--text-color);
  font-family: 'Helvetica Neue', Helvetica, Arial;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 10rem;
  padding: 2rem 0;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

footer {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

h1 {
  color: var(--primary-color);
}

.card, .table {
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 5%), 0 12px 24px rgb(0 0 0 / 5%);
  overflow: hidden;
}

.card {
  background-color: #fff;
  padding: 1.5rem 2rem;
  width: fit-content;
}

.card p:not(:last-child) {
  margin-bottom: 1rem;
}

.card strong {
  display: block;
  color: var(--primary-color);
}

.table {
  width: 100%;
  display: table;
}

.row {
  display: table-row;
  background: #f0f0f0;
}

.row:nth-of-type(odd) {
  background: #fff;
}

.row.header {
  font-weight: 900;
  color: #ffffff;
  background: var(--primary-color);
}

.cell {
  padding: 0.375rem 0.75rem;
  display: table-cell;
}

.cell.actions .action-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 0.375rem;
  margin-bottom: 1rem;
  resize: vertical;
  outline: none;
}

input[type=text]:focus, select:focus, textarea:focus {
  border: 1px solid var(--primary-color);
}

.primary-btn, .secondary-btn {
  border-radius: 4px;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  padding: 0.625rem 1.125rem;
  transition: all 0.2s;
  display: inline-block;
}

.primary-btn.small, .secondary-btn.small {
  padding: 0.375rem 0.75rem;
}

.primary-btn {
  background-color: var(--primary-color);
  color: #fff;
  font-weight: bold;
}

.primary-btn:hover {
  background-color: var(--primary-color-hover);
  border-color: var(--primary-color-hover);
}

.secondary-btn {
  background-color: transparent;
  color: var(--primary-color);
  text-decoration: none;
}

.secondary-btn.danger {
  color: var(--danger-color);
  border-color: var(--danger-color);
}

.secondary-btn:hover {
  background-color: #eaecfa;
}

@media screen and (max-width: 580px) {
  body {
    font-size: 16px;
    line-height: 22px;
    margin: 0 0.5rem;
  }

  header {
    flex-direction: column;
    row-gap: 1rem;
  }
  
  footer {
    flex-direction: column;
    text-align: center;
  }

  .table {
    display: block;
  }

  .row {
    padding: 14px 0 7px;
    display: block;
  }

  .row.header {
    padding: 0;
    height: 6px;
  }

  .row.header .cell {
    display: none;
  }

  .row .cell {
    margin-bottom: 10px;
  }
  
  .row .cell:before {
    margin-bottom: 3px;
    content: attr(data-title);
    min-width: 98px;
    font-size: 10px;
    line-height: 10px;
    font-weight: bold;
    text-transform: uppercase;
    color: #969696;
    display: block;
  }
  
  .cell {
    padding: 0.125rem 1rem;
    display: block;
  }
}
`;
