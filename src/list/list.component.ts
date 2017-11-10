import { Configuration } from '../interfaces';
import { ListCreator, getHeaders } from './list.creator';

declare let window;

export class CapivaraList {

    element: any;
    configuration: Configuration;
    Observe:any = window.Vue;

    constructor(_element: HTMLElement, _configuration: Configuration){
        if(!_element || !_element.nodeName){
            console.error('Erro ao criar uma capivara list, o primeiro parâmetro deve ser um elemento html.');
        }else if(!_configuration){
            console.error('Erro ao criar uma capivara list, o segundo parâmetro deve ser um objeto de configuração.');
        }
        this.element = _element;
        this.configuration = _configuration;
        this.element.capivaraScope = this;
        this.render();
    }

    /**
     * @method setConfiguration execute esse método para alterar toda confiração da tabela.
     * @param { Object } _configuration nova configuração a ser respeitada.
     */
    public setConfiguration(_configuration: any):void{
        this.configuration = _configuration;
        this.render();
    }

    /**
     * @method setElement execute esse método para modificar o elemento que a tabela irá renderizar.
     * @param { HTMLElement } _element novo elemento na qual a tabela irá renderizar.
     */
    public setElement(_element):void{
        this.element = _element;
        this.render();
    }

    /**
     * @public
     * @method setData execute esse método para modificar os dados da tabela.
     * @param { Array } _data array com novos dados.
     */
    public setData(_data: any): void {
        if(_data)
            this.configuration.data = _data;
        this.render();
    }
    
    /**
     * @private
     * @method render execute esse método para renderizar a tabela no elemento.
     */
    private render(){
        this.element.innerHTML = ListCreator.createHTML(this.configuration);        
        this.createObservable();
    }

    private createObservable(){
        var app = new this.Observe({
            el: this.element,
            data: {
                columns: getHeaders(this.configuration),
                configuration: this.configuration
            }, 
            methods: {
                sorted: (column) => {
                    console.log('voce clicou aqui otario', column)
                }
            }
        })
    }

}