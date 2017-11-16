import { Configuration } from '../interfaces';
import { ListCreator, getHeaders } from './list.creator';
import style from './list.style';

declare let window;

export class CapivaraList {

    element: any;
    configuration: Configuration;
    observe: any = window.Vue;
    vm: any;
    identifier: string;
    styleElement: HTMLElement;

    constructor(_element: HTMLElement, _configuration: Configuration) {
        if (!_element || !_element.nodeName) {
            console.error('Erro ao criar uma capivara list, o primeiro parâmetro deve ser um elemento html.');
        } else if (!_configuration) {
            console.error('Erro ao criar uma capivara list, o segundo parâmetro deve ser um objeto de configuração.');
        } else if (!this.observe) {
            console.error('Precisamos que você instale o Vue.js');
        } else {
            this.element = _element;
            this.configuration = Object.assign(this.getDefaultConfiguration(), _configuration);
            this.identifier = this.configuration.name || this.guid();
            this.element.classList.add('capivara-list');
            this.element.setAttribute('name', this.identifier);
            this.element.capivaraScope = this;
            this.render();
        }
    }

    /**
     * @method getDefaultConfiguration execute esse método para pegar as configurações padrão.
     */
    getDefaultConfiguration(){
        return {
            pagePosition: 'BOTTOM',
            actions: [],
            itemsPerPage: []
        }
    }

    /**
     * @method setConfiguration execute esse método para alterar toda confiração da tabela.
     * @param { Object } _configuration nova configuração a ser respeitada.
     */
    public setConfiguration(_configuration: any): void {
        this.configuration = _configuration;
        this.observe.set(this.vm, 'configuration', this.configuration);
        this.vm.$forceUpdate();
    }

    /**
     * @method setElement execute esse método para modificar o elemento que a tabela irá renderizar.
     * @param { HTMLElement } _element novo elemento na qual a tabela irá renderizar.
     */
    public setElement(_element): void {
        this.element = _element;
    }

    /**
     * @public
     * @method set execute para alterar um atributo da confiração.
     * @param { ANY } _key  chave com o nome do atributo.
     * @param { ANY } _value valor a ser inserido dentro do atributo.
     */
    public set(_key: any, _value): void {
        if (_key)
            this.configuration[_key] = _value;
        this.observe.set(this.vm, 'configuration', this.configuration);
        if(_key == 'data') this.disableLoading();
        this.vm.$forceUpdate();
    }

    /**
     * @public
     * @method setData execute esse método para modificar os dados da tabela.
     * @param { Array } _data array com novos dados.
     */
    public setData(_data: any): void {
        if (_data)
            this.configuration.data = _data;
        this.observe.set(this.vm, 'configuration', this.configuration);
        this.disableLoading();
        this.vm.$forceUpdate();
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
     * @method sorted ordena os dados de acordo com uma coluna.
     * @param {string} column nome da coluna na qual sera feita a ordenação.
     */
    sorted(column) {
        if (this.configuration.onSort && column.sortField) {
            this.enableLoading();
            this.observe.set(this.vm, 'activeSorted', {
                dir: this.vm.activeSorted.dir == 'asc' ? 'desc' : 'asc',
                field: column.sortField
            });
            this.configuration.onSort(this.configuration.pageModel, this.configuration.pageSize, this.vm.activeSorted.field, this.vm.activeSorted.dir);
        }
    }

    /**
     * @method isPosssibleLeft verifica se uma coluna pode ser movida para a esqueda.
     * @param {string} columns colunas disponiveis na tabela
     * @param {string} columnName noma da coluna a ser verificada.
     * @param {number} index índice para saber a posição atual da coluna.
     */
    isPosssibleLeft(columns, columnName, index) {
        if (!this.configuration.ordination) return false;
        if (columnName == '$checkbox' || index == 0) return false;
        if (this.configuration.checkbox && index == 1) return false;
        return true;
    }

    /**
     * @method isPosssibleRight verifica se uma coluna pode ser movida para a direita.
     * @param {string} columns colunas disponiveis na tabela
     * @param {string} columnName noma da coluna a ser verificada.
     * @param {number} index índice para saber a posição atual da coluna.
     */
    isPosssibleRight(columns, columnName, index) {
        if (!this.configuration.ordination) return false;
        if (columnName == '$checkbox') return false;
        if (index == columns.length - 1) return false;
        return true;
    }

    /**
     * @method moveColumn verifica se uma coluna pode ser movida para a direita.
     * @param {string} direction define para que posição a coluna será movida.
     * @param {string} columnName nome da coluna a ser movida.
     */
    moveColumn(direction, columnName) {
        let columns: any = this.configuration.columns.replace(/\s/g, '').split(','),
            columnIndex: number = columns.indexOf(columnName);
        switch (direction.toLowerCase()) {
            case 'left':
                var columnNameRemove = columns[columnIndex - 1];
                columns[columnIndex - 1] = columnName;
                columns[columnIndex] = columnNameRemove;
                break;
            case 'right':
                var columnNameRemove = columns[columnIndex + 1];
                columns[columnIndex + 1] = columnName;
                columns[columnIndex] = columnNameRemove;
                break;
        }
        this.configuration.columns = columns.toString();
        this.observe.set(this.vm, 'columns', getHeaders(this.configuration));
    }

    /**
     * @method getPossibleColumns pega as colunas que podem ser adicionadas em tempo de execução.
     */
    getPossibleColumns(){
        return this.configuration.columnsConfig.filter(column => column.possibleColumn);
    }

    /**
     * @method handlingLineHeight execute essa função para alterar o tamanho das linhas.
     * @param {number} height tamanho em pixel que ficará as linhas
     */
    handlingLineHeight(height){
        this.configuration.lineHeight = height;
        this.getStyleMaterialDesign();
    }

    replaceAll = (style, needle, replacement) => style.replace(new RegExp(needle, 'g'), replacement);

    /**
     * @method getStyleMaterialDesign execute esse metodo para gerar o CSS apenas para essa lista.
     */
    getStyleMaterialDesign(){
        let height = this.configuration.lineHeight || 48;
        let s = this.replaceAll(style, 'LINE_HEIGHT_VALUE', (height) + 'px');
        if(this.configuration.name){
          s = this.replaceAll(s, 'CAPIVARA_LIST_KEY', '.capivara-list[name="'+this.identifier+'"]');
        }else{
          s = this.replaceAll(s, 'CAPIVARA_LIST_KEY', '.capivara-list');
        }
        var checkboxColor = this.configuration.checkboxColor || '#4f8196';
        var activeLineColor = this.configuration.activeLineColor || '#f5f5f5';
        var hoverLineColor = this.configuration.hoverLineColor || activeLineColor;
        s = this.replaceAll(s, 'ACTIVE_ROW_COLOR', activeLineColor);
        s = this.replaceAll(s, 'HOVER_ROW_COLOR', hoverLineColor);
        s = this.replaceAll(s, 'CHECKBOX_COLOR', checkboxColor);
        return s;
    }

    /**
     * @method getTotalPage retorna o total de paginas para a paginação
     */
    getTotalPage(){
        var res = [];
        for (var i = 1; i <= Math.ceil(this.configuration.count / this.configuration.pageSize); i++) {
          res.push(i);
        }
        return res;
    }

    /**
     * @method roundNumber arredonda o número de registros.
     * @param count define quantos registros possui.
     * @param pageSize define a quantidade de registros por página
     * @param pageModel define a página atual
     */
    roundNumber(count, pageSize, pageModel){
        let round = pageSize * pageModel;
        if(Math.floor(round) >= count) return count;
        return round;
    }

    /**
     * @method existsPreviousPage verifica se possui uma página anterior.
     */
    existsPreviousPage(){
        return (this.configuration.pageModel - 1) > 0;
    }

    /**
     * @method existsNextPage verifica se existe uma próxima página.
     */
    existsNextPage(){
        return (this.configuration.pageModel+1) <= Math.ceil(this.configuration.count/this.configuration.pageSize);
    }

    /**
     * @method enableLoading Execute esse método para ativar a animação de carregando.
     */
    enableLoading(){
        this.observe.set(this.vm, 'loading', true);
    }

    /**
     * @method disableLoading Execute esse método para desativar a animação de carregando.
     */
    disableLoading(){
        this.observe.set(this.vm, 'loading', false);
    }

    /**
     * @param page Página na qual será alterada.
     * @param itensPerPage Total de registros que aparecerá na página.
     */
    changePage(page, itensPerPage){
        if(this.configuration.onPageChange){
            if(page != this.configuration.pageModel || itensPerPage != this.configuration.pageSize) this.enableLoading();
            this.configuration.pageSize = itensPerPage || this.configuration.pageSize;
            this.configuration.pageModel = page || this.configuration.pageModel;
            this.configuration.onPageChange(page, this.configuration.pageSize, this.vm.activeSorted.field, this.vm.activeSorted.dir);
        }
    }

    /**
     * @method nextPage Execute esse método para chamar a próxima página da tabela.
     */
    nextPage(){
        if(this.configuration.onPageChange && this.existsNextPage()){
            this.enableLoading();
            this.configuration.onPageChange(this.configuration.pageModel+1, this.configuration.pageSize, this.vm.activeSorted.field, this.vm.activeSorted.dir);
            this.configuration.pageModel = this.configuration.pageModel+1;
        }
    }

    /**
     * @method checkConditions Execute esse metodo para adicionar classes a uma linha.
     * @param row Linha a ser adicionada a classe caso a condição for verdadeira.
     */
    checkConditions(row: any){
        if(!this.configuration.conditionalClass) return "";
        let rowClass = this.configuration.conditionalClass(row);
        if(rowClass && typeof rowClass == "object") return rowClass;
        return "";
    }

    /**
     * @method previousPage Execute esse método para chamar a página anterior da tabela.
     */
    previousPage(){
        if(this.configuration.onPageChange && this.existsPreviousPage()){
            this.enableLoading();
            this.configuration.onPageChange(this.configuration.pageModel-1, this.configuration.pageSize, this.vm.activeSorted.field, this.vm.activeSorted.dir);
            this.configuration.pageModel = this.configuration.pageModel-1;
        }
    }

    inputPageChange(evt){
        if(evt.keyCode == 13){
            if(this.configuration.onPageChange && (Number(evt.target.value) <= Math.ceil(this.configuration.count/this.configuration.pageSize)) && evt.target.value != this.configuration.pageModel){
                this.enableLoading();
                this.configuration.pageModel = Number(evt.target.value);
                this.configuration.onPageChange(this.configuration.pageModel, this.configuration.pageSize, this.vm.activeSorted.field, this.vm.activeSorted.dir);
            }
        }
    }

    guid(){
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    /**
     * @method removeStyle Remove o estilo dessa tabela.
     */
    removeStyle(){
        if(this.styleElement && document.head.contains(this.styleElement)) document.head.removeChild(this.styleElement);
    }

    /**
     * @method addStyle Adiciona o elemento de estilo para essa tabela.
     */
    addStyle(){
        this.styleElement = document.createElement('style');
        this.styleElement.id = this.identifier;
        this.styleElement.appendChild(document.createTextNode(this.getStyleMaterialDesign()));
        document.head.appendChild(this.styleElement);
    }

    /**
     * @method createObservable criar eventos de ações na listagem.
     */
    private createObservable(element) {
        this.addStyle();

        this.vm = new this.observe({
            el: element,
            data: {
                columns: getHeaders(this.configuration),
                configuration: this.configuration,
                activeSorted: {},
                selectedValues: [],
                loading: true,
                methods: this.configuration.methods
            },
            methods: {
                sorted: (column) => this.sorted(column),
                isPosssibleLeft:  (columns, columnName, index) => this.isPosssibleLeft(columns, columnName, index),
                isPosssibleRight: (columns, columnName, index) => this.isPosssibleRight(columns, columnName, index),
                moveColumn: (direction, columnName) => this.moveColumn(direction, columnName),
                getPossibleColumns: () => this.getPossibleColumns(),
                handlingLineHeight: (height) => this.handlingLineHeight(height),
                getTotalPage: () => this.getTotalPage(),
                roundNumber: (count, pageSize, pageModel) => this.roundNumber(count, pageSize, pageModel),
                existsPreviousPage: () => this.existsPreviousPage(),
                existsNextPage: () => this.existsNextPage(),
                changePage: (page, itensPerPage) => this.changePage(page, itensPerPage),
                nextPage: () => this.nextPage(),
                previousPage: () => this.previousPage(),
                checkConditions: (row) => this.checkConditions(row),
                inputPageChange: (evt) => this.inputPageChange(evt)
            }
        });

    }

}
