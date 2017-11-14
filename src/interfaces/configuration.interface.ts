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

    /**
     * Função executada quando o usuário deseja ordenar clicando em uma coluna.
     */
    onSort: Function;

    /**
     * Atributo que define se as colunas vão ser ordenadas.
     */
    ordination: Boolean;
    /**
     * Atributo que define se o table vai ter uma opção para selecionar os registro.
     */
    checkbox: Boolean;
}