export interface Configuration {

    /**
     * atributo que define um nome para sua tabela, usada para separação de CSS.
     */
    name: string;

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
    /**
     * Atributo que define se o table vai usar material design como tema.
     */
    materialTheme: Boolean;
    /**
     * Atributo que define o tamanho em pixel das linhas.
     */
    lineHeight: number;

    /**
     * Define a cor do checkbox.
     */
    checkboxColor: string;

    /**
     * Define a cor da linha quando está selecionada.
     */
    activeLineColor: string;

    /**
     * Define a cor da linha ao passa o mouse sobre ela.
     */
    hoverLineColor: string;

    /**
     * Quantiade de registros por página.
     */
    pageSize: number;

    /**
     * Total de registros.
     */
    count: number;

    /**
     * Coloca botões de ação na tabela.
     */
    actions: Array<any>;

    /**
     * Define em qual página está. 
     */
    pageModel: any;

    /**
     * Função executada quando uma página é alterada para buscar novos dados.
     */
    onPageChange: Function;

    /**
     * Função executada para adicionar classes a uma linha apartir de uma condição.
     */
    conditionalClass: Function;

    methods: any;
}