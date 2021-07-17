<template>
  <div>
    <h1>Instrumentos de la investigacion</h1>
    <table>
      <thead>
        <tr>
          <th colspan="4">Atividades do projeto</th>
        </tr>
        <tr>
          <th>#</th>
          <th colspan="2">Atividade</th>
          <th colspan="2">aea</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="3">fila brus</td>
          <td rowspan="3">fila brus1</td>
          <td rowspan="3">fila brus2</td>
          <td>Variable 1</td>
        </tr>
        <tr>
          <td>Variable 2</td>
        </tr>
        <tr>
          <td>Variable 3</td>
        </tr>
        <tr>
          <td rowspan="2">fila brus</td>
          <td rowspan="2">fila brus1</td>
          <td rowspan="2">fila brus2</td>
          <td>Variable 3</td>
        </tr>
        <tr>
          <td>Variable 4</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

table {
  text-align: left;
  line-height: 40px;
  border-collapse: separate;
  border-spacing: 0;
  border: 2px solid #ed1c40;
  width: 500px;
  margin: 50px auto;
  border-radius: 0.25rem;
}

thead tr:first-child {
  background: #ed1c40;
  color: #fff;
  border: none;
}

th:first-child,
td:first-child {
  padding: 0 15px 0 20px;
}

th {
  font-weight: 500;
}

thead tr:last-child th {
  border-bottom: 3px solid #ddd;
}

tbody tr:hover {
  background-color: #f2f2f2;
  cursor: default;
}

tbody tr:last-child td {
  border: none;
}

tbody td {
  border-bottom: 1px solid #ddd;
}

td:last-child {
  text-align: right;
  padding-right: 10px;
}

.button {
  color: #aaa;
  cursor: pointer;
  vertical-align: middle;
  margin-top: -4px;
}

.edit:hover {
  color: #0a79df;
}

.delete:hover {
  color: #dc2a2a;
}
</style>