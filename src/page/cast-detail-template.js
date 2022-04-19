/* global Handlebars */

const template = `
<div class="min-h-screen bg-blue-50">
  <div class="container mx-auto">
    <div class="p-4 text-2xl text-gray-700">
      <div>{{cast.name}}</div>
    </div>
  </div>
</div>
`;

export default Handlebars.compile(template);
