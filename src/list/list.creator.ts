import { Configuration } from '../interfaces';

declare function require(string): string;

let Html = require('./list.component.html');

declare let window;

/**
 * @method getHeaders
 * @param {Object} configuration usado para pegar as configurações de cada coluna.
 */
export const getHeaders = (configuration: Configuration):Array<any> => {
    configuration.columnsConfig = configuration.columnsConfig || [];
    if(!configuration.columns && configuration.data && configuration.data.length > 0){
        configuration.columns = Object.keys(configuration.data[0]).toString();
    }
    return configuration.columns.split(',').map(rawColumn => {
        let column        = rawColumn.trim();
        let columnConfig  = configuration.columnsConfig.filter(value => value.name == column)[0] || { name: column };

        return {
            title: columnConfig.title || (column.charAt(0).toUpperCase() + column.slice(1)),
            size : columnConfig.resizable && columnConfig.size ? columnConfig.size :  ' ',
            name : columnConfig.name ||  column,
            editable: columnConfig.editable ||  false,
            possibleColumn: columnConfig.possibleColumn    ||  false,
            label: columnConfig.label ||  column,
            sortField: columnConfig.sortField   ||  null,
            alignColumn: columnConfig.alignColumn ||  'left',
            alignRows: columnConfig.alignRows   ||  'left',
            content: columnConfig.content   ||  '',
            widthPorcentage: columnConfig.widthPorcentage   || null,
            conditional: columnConfig.conditional ? columnConfig.conditional : null
        }

    });
}

export namespace ListCreator {

    /**
     * @method createHTML execute para criar o html.
     * @param {Object} configuration atributo com os dados que será usado para criar a tabela.
     */
    export function createHTML(configuration: Configuration): string {
        return Html;
    }

}