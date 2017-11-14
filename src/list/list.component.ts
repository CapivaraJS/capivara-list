import { Configuration } from '../interfaces';
import { ListCreator, getHeaders } from './list.creator';

declare let window;

export class CapivaraList {

    element: any;
    configuration: Configuration;
    observe: any = window.Vue;

    constructor(_element: HTMLElement, _configuration: Configuration) {
        if (!_element || !_element.nodeName) {
            console.error('Erro ao criar uma capivara list, o primeiro parâmetro deve ser um elemento html.');
        } else if (!_configuration) {
            console.error('Erro ao criar uma capivara list, o segundo parâmetro deve ser um objeto de configuração.');
        } else if (!this.observe) {
            console.error('Precisamos que você instale o Vue.js');
        } else {
            this.element = _element;
            this.configuration = _configuration;
            this.element.capivaraScope = this;
            this.render();
        }
    }

    /**
     * @method setConfiguration execute esse método para alterar toda confiração da tabela.
     * @param { Object } _configuration nova configuração a ser respeitada.
     */
    public setConfiguration(_configuration: any): void {
        this.configuration = _configuration;
        this.render();
    }

    /**
     * @method setElement execute esse método para modificar o elemento que a tabela irá renderizar.
     * @param { HTMLElement } _element novo elemento na qual a tabela irá renderizar.
     */
    public setElement(_element): void {
        this.element = _element;
        this.render();
    }

    /**
     * @public
     * @method setData execute esse método para modificar os dados da tabela.
     * @param { Array } _data array com novos dados.
     */
    public setData(_data: any): void {
        if (_data)
            this.configuration.data = _data;
        this.render();
    }

    /**
     * @private
     * @method render execute esse método para renderizar a tabela no elemento.
     */
    private render() {
        this.element.innerHTML = ListCreator.createHTML(this.configuration);
        this.createObservable(this.element);
    }

    /**
     * @method createObservable criar eventos de ações na listagem.
     */
    private createObservable(element) {
        let vm = new this.observe({
            el: element,
            data: {
                columns: getHeaders(this.configuration),
                configuration: this.configuration,
                activeSorted: {}
            },
            methods: {
                sorted: (column) => {
                    if (this.configuration.onSort) {
                        this.observe.set(vm, 'activeSorted', {
                            dir: vm.activeSorted.dir == 'asc' ? 'desc' : 'asc',
                            field: column.sortField
                        });
                        this.configuration.onSort(vm.activeSorted.field, vm.activeSorted.dir);
                    }
                },
                isPosssibleLeft: (columns, columnName, index) => {
                    if (!this.configuration.ordination) return false;
                    if (columnName == '$checkbox' || index == 0) return false;
                    if (this.configuration.checkbox && index == 1) return false;
                    return true;
                },
                isPosssibleRight: (columns, columnName, index) => {
                    if (!this.configuration.ordination) return false;
                    if (columnName == '$checkbox') return false;
                    if (index == columns.length - 1) return false;
                    return true;
                },
                moveColumn: (direction, columnName) => {
                    let columns:any = this.configuration.columns.replace(/\s/g,'').split(','), 
                        columnIndex: number = columns.indexOf(columnName);
                    switch (direction.toLowerCase()) {
                      case 'left':
                        var columnNameRemove = columns[columnIndex-1];
                        columns[columnIndex-1] = columnName;
                        columns[columnIndex] = columnNameRemove;
                        break;
                      case 'right':
                        var columnNameRemove = columns[columnIndex+1];
                        columns[columnIndex+1] = columnName;
                        columns[columnIndex] = columnNameRemove;
                        break;
                    }
                    this.configuration.columns = columns.toString();
                    this.observe.set(vm, 'columns', getHeaders(this.configuration));
                  }
            }
        });

    }

}