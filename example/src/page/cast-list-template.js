/* global Handlebars */
import '../typography.css';

const template = `
<div class="min-h-screen bg-blue-50">
  <div class="container mx-auto">
    <div class="p-4 text-2xl text-gray-700">
      {{#each castList}}
        <div class="{{#if isRead}}bg-indigo-500 text-white shadow-none{{/if}} p-6 mt-6 rounded-lg shadow-md transition-colors duration-500 hover: bg-blue-100">
          <div class="flex flex-col items-center md:flex-row">
            <div class="flex-auto">
              <a href="#/cast/{{id}}">{{name}}</a>
            </div>
            <div class="text-center text-xs md:text-sm">
              <div class="text-white bg-blue-400 rounded-lg p-1 md:p-2">
                {{email}}
              </div>
            </div>
          </div>
          <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-slate-400 gap-x-1">
              <div class="whitespace-nowrap overflow-hidden text-ellipsis"><i class="fas fa-user mr-1"></i>{{username}}</div>
              <a class="whitespace-nowrap overflow-hidden text-ellipsis" href="https://{{website}}" target="_blank" rel="noopener noreferrer"><i class="fas fa-link mr-1"></i>{{website}}</a>
              <div class="whitespace-nowrap overflow-hidden text-ellipsis"><i class="fas fa-phone mr-1"></i>{{phone}}</div>
            </div>
          </div>
        </div>
      {{/each}}     
    </div>
  </div>
</div>
`;

export default Handlebars.compile(template);
