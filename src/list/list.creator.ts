import { Configuration } from '../interfaces';

declare function require(string): string;

declare let window;

const paginationTemplate = `
<div class="page-select">
  <div class="btn-group smart-footer-item">
    <button type="button"
            class="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
      Página: &nbsp; {{configuration.pageModel}} &nbsp; <span class="caret"></span>
    </button>
    <ul class="gmd dropdown-menu">
      <li class="search">
        <input type="number" min="1" step="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autofocus :max="getTotalPage()[getTotalPage().length - 1]" placeholder="Página" class="form-control" v-on:keypress="inputPageChange($event)"/>
      </li>
      <li class="effect-ripple" 
          v-bind:class="{'selected' : page == configuration.pageModel}"
          v-on:click="changePage(page, configuration.pageSize)" v-for="(page, index) in getTotalPage()">
          {{page}}
      </li>
    </ul>
  </div>
</div>
<div class="page-select" v-show="configuration.itemsPerPage.length > 0">
  <div class="btn-group smart-footer-item">
    <button type="button"
            class="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
        Linhas por página: &nbsp; {{configuration.pageSize}} &nbsp; <span class="caret"></span>
    </button>
    <ul class="gmd dropdown-menu">
      <li class="effect-ripple"
          v-bind:class="{'selected' : itemPerPage == configuration.pageSize}"
          v-on:click="changePage(configuration.pageModel, itemPerPage)" v-for="itemPerPage in configuration.itemsPerPage">
        {{itemPerPage}}
      </li>
    </ul>
  </div>
</div>
<div class="page-select">
  <div class="smart-footer-item">
    {{ 1+ (configuration.pageModel-1) * configuration.pageSize}} - {{roundNumber(configuration.count, configuration.pageSize, configuration.pageModel)}} de {{configuration.count}}
    <button class="btn" type="button" :disabled="!existsPreviousPage()" v-on:click="previousPage()"><i class="effect-ripple glyphicon glyphicon-chevron-left"></i></button>
    <button class="btn" type="button" :disabled="!existsNextPage()" v-on:click="nextPage()"><i class="effect-ripple glyphicon glyphicon-chevron-right"></i></button>
  </div>
</div>
`;


/**
 * @method getHeaders
 * @param {Object} configuration usado para pegar as configurações de cada coluna.
 */
export const getHeaders = (configuration: Configuration): Array<any> => {
    configuration.columnsConfig = configuration.columnsConfig || [];
    if (!configuration.columns && configuration.data && configuration.data.length > 0) {
        configuration.columns = Object.keys(configuration.data[0]).toString();
    }
    return configuration.columns.split(',').map(rawColumn => {
        let column = rawColumn.trim();
        let columnConfig = configuration.columnsConfig.filter(value => value.name == column)[0] || { name: column };

        return {
            title: columnConfig.title || (column.charAt(0).toUpperCase() + column.slice(1)),
            size: columnConfig.resizable && columnConfig.size ? columnConfig.size : ' ',
            name: columnConfig.name || column,
            editable: columnConfig.editable || false,
            possibleColumn: columnConfig.possibleColumn || false,
            label: columnConfig.label || column,
            sortField: columnConfig.sortField || null,
            alignColumn: columnConfig.alignColumn || 'left',
            alignRows: columnConfig.alignRows || 'left',
            content: columnConfig.content || '{{$value.' + column + '}}',
            widthPorcentage: columnConfig.widthPorcentage || null,
            conditional: columnConfig.conditional ? columnConfig.conditional : null
        }
    });
}

const generateBody = (configuration: Configuration) => {
    return getHeaders(configuration).reduce((prev, next, index) => {
        return prev += `
            <td class="${next.size}"
                v-bind:class="checkConditions($value)"
                style="text-align: ${next.alignRows};">
                ${next.content}
            </td>
        `;
    }, ' ');
}

export namespace ListCreator {

    /**
     * @method createHTML execute para criar o html.
     * @param {Object} configuration atributo com os dados que será usado para criar a tabela.
     */
    export function createHTML(configuration: Configuration): string {
        return `
        
        <div v-bind:class="{'gmd panel' : configuration.materialTheme}">
            <div class="page-select" v-show="getPossibleColumns().length > 0" style="position: absolute;right: 35px;z-index: 10;top: 15px;">
                <div class="btn-group smart-footer-item">
                    <button class="btn btn-default dropdown-toggle " data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false"
                        style="font-size: 14px;">
                        <span class="glyphicon glyphicon-plus"></span>
                    </button>
                    <ul class="gmd dropdown-menu" style="margin-left: -120px;margin-top: -20px;">
                        <li style="border-bottom: 1px solid #ddd;">
                            <label>Adicionar colunas</label>
                        </li>
                        <li class="effect-ripple" v-for="column in getPossibleColumns()" v-on:click="addColumn(column)">
                            {{column.label || column.name}}
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="(configuration.materialTheme
                && ((configuration.actions && configuration.actions.length > 0
                || configuration.title)
                || configuration.enabledBetweenLines))" v-bind:class="{'panel-actions' : configuration.materialTheme}">
                <h4 v-show="configuration.title">{{configuration.title}}</h4>
                <div class="actions">
                    <div v-for="action in configuration.actions" 
                        v-on:click="action.onClick(selectedValues, configuration.data)" 
                        style="float: left;padding-left: 15px;"
                        v-html="action.icon"
                        v-bind:class="selectedValues.length > 0 ? action.classOnSelectedValues : action.classOnNotSelectedValues">
                    </div>
                    <div style="float: left;padding-left: 15px;" v-show="configuration.enabledBetweenLines">
                        <i class="glyphicon glyphicon-menu-hamburger" v-on:click="handlingLineHeight(25)" style="font-size: 14px;"></i>
                        <i class="glyphicon glyphicon-menu-hamburger" v-on:click="handlingLineHeight(48)" style="font-size: 16px;margin-left: 5px;"></i>
                        <i class="glyphicon glyphicon-menu-hamburger" v-on:click="handlingLineHeight(60)" style="font-size: 20px;margin-left: 5px;"></i>
                    </div>
                </div>
            </div>
            <div v-show="(configuration.materialTheme && configuration.pageSize) && (configuration.pagePosition.toUpperCase() == 'TOP' || configuration.pagePosition.toUpperCase() == 'ALL')"
                v-bind:class="{'panel-heading' : configuration.materialTheme}"
                v-bind:style="{'justify-content' : configuration.pageAlign}">
                ${paginationTemplate}
            </div>
            <div v-bind:class="{'panel-body' : configuration.materialTheme}" style="padding: 0;position: relative;">
                <div class="table-responsive table-capivara-list-container" :style="configuration.maxHeight ? 'max-height: ' + configuration.maxHeight : ''">
                    <table v-bind:class="configuration.className">
                        <thead>
                            <th v-for="(column, index) in columns">
                                <div style="display: flex;">
                                    <i v-show="isPosssibleLeft(columns, column.name, index)" class="glyphicon glyphicon-triangle-left left" v-on:click="moveColumn('left', column.name)"></i>
                                    <a class="th-sort" v-on:click="sorted(column)" v-bind:class="{'sort-active': column.name == activeSorted.field}">
                                        {{column.title}}
                                    </a> 
                                    <span class="sort-caret-span"
                                          v-bind:class="{'dropup' : activeSorted.dir == 'asc', 'disabled': !column.sortField}">
                                        <span class="caret"></span>
                                    </span>
                                    <i v-show="isPosssibleRight(columns, column.name, index)" class="glyphicon glyphicon-triangle-right right" v-on:click="moveColumn('right', column.name)"></i>
                                </div>
                            </th>
                        </thead>
                        <tbody>
                            <tr v-for="$value in configuration.data">
                                ${generateBody(configuration)}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="progress" v-show="loading">
                    <div class="indeterminate"></div>
                </div>
            </div>

            <div v-if="(configuration.materialTheme && configuration.pageSize) && (configuration.pagePosition.toUpperCase() == 'BOTTOM' || configuration.pagePosition.toUpperCase() == 'ALL')"
                 v-bind:class="{'panel-footer gumga-list-paginable' : configuration.materialTheme}"
                 v-bind:style="{'justify-content' : configuration.pageAlign}">
                 <div class="signal" v-show="configuration.loading"></div>
                ${paginationTemplate}
            </div>

        </div>
        `
    }

}