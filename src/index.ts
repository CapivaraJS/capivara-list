import Vue from "vue/dist/vue";
import { CapivaraList } from './list/list.component'

declare let window;

window.Vue = window.Vue || Vue; 
window.CapivaraList = window.CapivaraList || CapivaraList;
