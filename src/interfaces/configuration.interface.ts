export interface Configuration {

    /**
     * Array de objetos a serem mostrados na tabela.
     */
    data: Array<any>;    
    
    /**
     * Colunas visiveis na tabela.
     */
    columns: string;

    /**
     * Objeto de configuração de cada coluna.
     */
    columnsConfig: Array<any>;

    /**
     * String com classes para seram aplicadas na tabela.
     */
    className: string;
}