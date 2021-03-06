export default `

CAPIVARA_LIST_KEY tr th, 
CAPIVARA_LIST_KEY .panel .panel-footer, 
CAPIVARA_LIST_KEY .panel-actions{
  background-color: #F5F5F5;
}

CAPIVARA_LIST_KEY .sort-caret-span.disabled{
  display: none;
}

.table-capivara-list-container{
  position: relative;
}

CAPIVARA_LIST_KEY .th-sort{
  opacity: .8;
}

CAPIVARA_LIST_KEY .th-sort:hover{
  opacity: 1;
}

CAPIVARA_LIST_KEY .th-sort ~ .sort-caret-span{
  opacity: 0;
}

CAPIVARA_LIST_KEY .th-sort:hover ~ .sort-caret-span{
  opacity: 1;
}

CAPIVARA_LIST_KEY .th-sort.sort-active ~ .sort-caret-span{
  display: flex;
  opacity: 1;
}

/* Progress Bar */
CAPIVARA_LIST_KEY .progress {
  position: absolute;
  height: 1.52px;
  display: block;
  bottom: -10px;
  left: 0;
  width: 100%;
  background-color: #acece6;
  border-radius: 2px;
  background-clip: padding-box;
  margin: 0.5rem 0 1rem 0;
  z-index: 1;
  overflow: hidden; }

CAPIVARA_LIST_KEY .progress .determinate {
  position: absolute;
  background-color: inherit;
  top: 0;
  bottom: 0;
  background-color: #26a69a;
  transition: width .3s linear; }

CAPIVARA_LIST_KEY .progress .indeterminate {
  background-color: #26a69a; }

CAPIVARA_LIST_KEY .progress .indeterminate:before {
  content: '';
  position: absolute;
  background-color: inherit;
  top: 0;
  left: 0;
  bottom: 0;
  will-change: left, right;
  -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
          animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite; }

CAPIVARA_LIST_KEY .progress .indeterminate:after {
  content: '';
  position: absolute;
  background-color: inherit;
  top: 0;
  left: 0;
  bottom: 0;
  will-change: left, right;
  -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
          animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  -webkit-animation-delay: 1.15s;
          animation-delay: 1.15s; }

@-webkit-keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%; }
  60% {
    left: 100%;
    right: -90%; }
  100% {
    left: 100%;
    right: -90%; } }
@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%; }
  60% {
    left: 100%;
    right: -90%; }
  100% {
    left: 100%;
    right: -90%; } }
@-webkit-keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%; }
  60% {
    left: 107%;
    right: -8%; }
  100% {
    left: 107%;
    right: -8%; } }
@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%; }
  60% {
    left: 107%;
    right: -8%; }
  100% {
    left: 107%;
    right: -8%; } }

CAPIVARA_LIST_KEY .panel.gmd {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
}

CAPIVARA_LIST_KEY table.resize th {
    position: relative;
    min-width: 10px ;
}

/**
  START PERSONALIZE ROWS
**/
CAPIVARA_LIST_KEY tr td, CAPIVARA_LIST_KEY tr th{
  border-top: 1px solid rgba(168, 159, 159, 0.12);
}
CAPIVARA_LIST_KEY tr:hover td{
  background-color: HOVER_ROW_COLOR;
  border-top: 1px solid rgba(168, 159, 159, 0.12);
}

/**
  END PERSONALIZE ROWS
**/
CAPIVARA_LIST_KEY table th i{
  display: none;
}
CAPIVARA_LIST_KEY table td[contenteditable="true"]{
  border: 1px solid #175bc1;
}
CAPIVARA_LIST_KEY table th i.left{
  font-size: 10px;
  color: #ccc;
  position: absolute;
  left: 5px;
  top: 18px;
  cursor: pointer;
}
CAPIVARA_LIST_KEY table th i.right{
  font-size: 10px;
  color: #ccc;
  position: absolute;
  right: 5px;
  top: 18px;
  cursor: pointer;
}
CAPIVARA_LIST_KEY table th:hover i{
  display: block;
}
CAPIVARA_LIST_KEY table.resize tr th .handle {
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0px;
    cursor: ew-resize ;
    background: #f3f3f3;
}
CAPIVARA_LIST_KEY table.resize tr th .handle.active {
    background: #ddd;
}
@media only screen and (max-device-width: 480px) {
    CAPIVARA_LIST_KEY table.resize tr th .handle {
        display: none;
    }
}
CAPIVARA_LIST_KEY .table{
  margin: 0;
}
CAPIVARA_LIST_KEY tr{
  transition: background-color .2s;
  height: LINE_HEIGHT_VALUE;
  font-family: Roboto,"Helvetica Neue",sans-serif;
}
CAPIVARA_LIST_KEY tr th a:hover{
  color: #525252;
  text-decoration: none;
  cursor: pointer;
}
CAPIVARA_LIST_KEY .panel-footer, CAPIVARA_LIST_KEY .panel-heading{
  padding: 10px;
  text-align: right;
  background-color: #fff;
  border-top: 0;
  padding-bottom: 0;
}
CAPIVARA_LIST_KEY .panel-actions{
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  flex-wrap: wrap-reverse;
  box-sizing: border-box;
  font-size: 12px;
  color: rgba(0,0,0,.87);
  padding: 10px 24px;
  display: flex;
  padding-top: 0;
  padding-bottom: 0;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
CAPIVARA_LIST_KEY .panel-actions .actions{
  margin-left: auto;
  padding-top: 10px;
}
CAPIVARA_LIST_KEY .panel-actions .actions i,  CAPIVARA_LIST_KEY .panel-actions .actions span{
  font-size: 20px;
  cursor: pointer;
}
CAPIVARA_LIST_KEY .table>thead>tr>th{
  border: none;
  vertical-align: middle;
  position: relative;
}
.effect-ripple {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}
.effect-ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform .5s, opacity 1s;
}
.effect-ripple:active:after {
  transform: scale(0, 0);
  opacity: .2;
  transition: 0s;
}
CAPIVARA_LIST_KEY .signal {
  border: 5px solid #333;
  border-radius: 30px;
  height: 30px;
  left: 35px;
  opacity: 0;
  position: absolute;
  width: 30px;
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
}
@keyframes pulsate {
    0% {
      transform: scale(.1);
      opacity: 0.0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
}
CAPIVARA_LIST_KEY .panel .panel-body{
  margin: 0 ;
}
CAPIVARA_LIST_KEY .table>tbody>tr.active>td,
CAPIVARA_LIST_KEY .table>tbody>tr.active>th{
   background: ACTIVE_ROW_COLOR;
   border: none;
}
CAPIVARA_LIST_KEY .table>tbody>tr.active:hover>td,
CAPIVARA_LIST_KEY .table>tbody>tr.active>:hover > th{
  background: HOVER_ROW_COLOR ;
}
CAPIVARA_LIST_KEY .smart-footer-item button{
  border: none ;
  outline: none ;
  background: transparent;
  color: rgba(0,0,0,.54);
  font-size: 13px;
  padding-top: 0;
  padding-bottom: 0;
}
CAPIVARA_LIST_KEY .smart-footer-item > button:hover, CAPIVARA_LIST_KEY .smart-footer-item > button:active{
  background: transparent;
  outline: none ;
  color: #000000;
  box-shadow: none;
}
CAPIVARA_LIST_KEY .btn-default.active.focus, .btn-default.active:focus, .btn-default.active:hover, .btn-default:active.focus, .btn-default:active:focus, .btn-default:active:hover, .open>.dropdown-toggle.btn-default.focus, .open>.dropdown-toggle.btn-default:focus, .open>.dropdown-toggle.btn-default:hover{
  box-shadow: none;
  background: transparent;
}
CAPIVARA_LIST_KEY .smart-footer-item ul{
  margin-top: -32px;
  width: 136px;
  max-width: 136px;
  min-height: 48px;
  max-height: 256px;
  overflow-y: auto;
  padding: 0;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);
  transition: all .4s cubic-bezier(.25,.8,.25,1);
  border-radius: 2px;
  border: none;
}
CAPIVARA_LIST_KEY .smart-footer-item{
  font-size: 13px;
}
CAPIVARA_LIST_KEY  .dropdown-menu {
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
    transform: rotateX(90deg);
    transform-origin: top;
    opacity: 0;
    display: block;
}
CAPIVARA_LIST_KEY  .open .dropdown-menu {
    opacity: 1;
    transform: rotateX(0deg);
    transform-origin: top;
}
CAPIVARA_LIST_KEY .smart-footer-item ul li{
  cursor: pointer;
  padding: 16px 16px;
  font-size: 12px;
  color: rgba(0,0,0,0.87);
  background: #F5F5F5;
  align-items: center;
  height: 48px;
}
CAPIVARA_LIST_KEY .smart-footer-item ul li.search{
  margin: 0;
  padding: 0;
}
CAPIVARA_LIST_KEY .smart-footer-item ul li.search input{
  border: none;
  border-radius: 0;
  box-shadow: none;
  background: #fff;
}
CAPIVARA_LIST_KEY .smart-footer-item ul li.selected{
  color: rgb(33,150,243);
}
CAPIVARA_LIST_KEY .panel .panel-footer, CAPIVARA_LIST_KEY .panel .panel-heading{
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-flex-wrap: wrap-reverse;
  -ms-flex-wrap: wrap-reverse;
  flex-wrap: wrap-reverse;
  box-sizing: border-box;
  padding: 0px 24px;
  font-size: 12px;
  color: rgba(0,0,0,.54);
  border-top: 1px rgba(0,0,0,.12) solid;
}
CAPIVARA_LIST_KEY .panel .panel-footer .page-select, CAPIVARA_LIST_KEY .panel .panel-heading .page-select{
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  height: 56px;
}
CAPIVARA_LIST_KEY .input-inline-edit{
    background: transparent ;
    border: none ;
    outline: 1px solid #ccc ;
    padding-left: 1px ;
    padding-right: 1px ;
    max-width: 100% ;
    width: 100% ;
}
CAPIVARA_LIST_KEY td[class*="td-checkbox"], CAPIVARA_LIST_KEY th, CAPIVARA_LIST_KEY td[class*="ng-binding"]{
  font-family: Roboto,"Helvetica Neue",sans-serif;
  color: rgba(0,0,0,.87);
  font-size: 13px;
  border-top: 1px solid rgba(168, 159, 159, 0.12);
  vertical-align: middle;
}
CAPIVARA_LIST_KEY .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
  padding: 10px 5px 10px 24px !important;
  
}
CAPIVARA_LIST_KEY table td:not(:empty){
   padding: 0px 24px 0px 24px !important;
   vertical-align: middle !important;
}
CAPIVARA_LIST_KEY tr td < span:nth-child(n+10) {
    background-color:red ;
}
CAPIVARA_LIST_KEY .table-responsive{
  border: none;
}
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"], .pure-radiobutton input[type="checkbox"], .pure-checkbox input[type="radio"], .pure-radiobutton input[type="radio"] {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"]:focus + label:before, .pure-radiobutton input[type="checkbox"]:focus + label:before, .pure-checkbox input[type="radio"]:focus + label:before, .pure-radiobutton input[type="radio"]:focus + label:before, .pure-checkbox input[type="checkbox"]:hover + label:before, .pure-radiobutton input[type="checkbox"]:hover + label:before, .pure-checkbox input[type="radio"]:hover + label:before, .pure-radiobutton input[type="radio"]:hover + label:before {
  border-color: CHECKBOX_COLOR;
  background-color: #f2f2f2;
}
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"]:active + label:before, .pure-radiobutton input[type="checkbox"]:active + label:before, .pure-checkbox input[type="radio"]:active + label:before, .pure-radiobutton input[type="radio"]:active + label:before { transition-duration: 0s; }
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"] + label, .pure-radiobutton input[type="checkbox"] + label, .pure-checkbox input[type="radio"] + label, .pure-radiobutton input[type="radio"] + label {
  position: relative;
  padding-left: 2em;
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
}
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"] + label:before, .pure-radiobutton input[type="checkbox"] + label:before, .pure-checkbox input[type="radio"] + label:before, .pure-radiobutton input[type="radio"] + label:before {
  box-sizing: content-box;
  content: '';
  color: CHECKBOX_COLOR;
  position: absolute;
  top: 50%;
  left: 0;
  width: 14px;
  height: 14px;
  margin-top: -9px;
  border: 2px solid CHECKBOX_COLOR;
  text-align: center;
  transition: all 0.4s ease;
}
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"] + label:after, .pure-radiobutton input[type="checkbox"] + label:after, .pure-checkbox input[type="radio"] + label:after, .pure-radiobutton input[type="radio"] + label:after {
  box-sizing: content-box;
  content: '';
  background-color: CHECKBOX_COLOR;
  position: absolute;
  top: 50%;
  left: 4px;
  width: 10px;
  height: 10px;
  margin-top: -5px;
  transform: scale(0);
  transform-origin: 50%;
  transition: transform 200ms ease-out;
}
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"]:disabled + label:before, .pure-radiobutton input[type="checkbox"]:disabled + label:before, .pure-checkbox input[type="radio"]:disabled + label:before, .pure-radiobutton input[type="radio"]:disabled + label:before { border-color: #cccccc; }
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"]:disabled:focus + label:before, .pure-radiobutton input[type="checkbox"]:disabled:focus + label:before, .pure-checkbox input[type="radio"]:disabled:focus + label:before, .pure-radiobutton input[type="radio"]:disabled:focus + label:before, .pure-checkbox input[type="checkbox"]:disabled:hover + label:before, .pure-radiobutton input[type="checkbox"]:disabled:hover + label:before, .pure-checkbox input[type="radio"]:disabled:hover + label:before, .pure-radiobutton input[type="radio"]:disabled:hover + label:before { background-color: inherit; }
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"]:disabled:checked + label:before, .pure-radiobutton input[type="checkbox"]:disabled:checked + label:before, .pure-checkbox input[type="radio"]:disabled:checked + label:before, .pure-radiobutton input[type="radio"]:disabled:checked + label:before { background-color: #cccccc; }
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"] + label:after, .pure-radiobutton input[type="checkbox"] + label:after {
  background-color: transparent;
  top: 50%;
  left: 4px;
  width: 8px;
  height: 3px;
  margin-top: -4px;
  border-style: solid;
  border-color: #ffffff;
  border-width: 0 0 3px 3px;
  border-image: none;
  transform: rotate(-45deg) scale(0);
}
CAPIVARA_LIST_KEY .pure-checkbox{
  width: 18px;
  display: inline-block;
}

CAPIVARA_LIST_KEY .sort-caret-span{
    display: flex;
    align-items: center;
    margin-right: 17px;
    margin-left: 5px;
}

CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"]:checked + label:after, .pure-radiobutton input[type="checkbox"]:checked + label:after {
  content: '';
  transform: rotate(-45deg) scale(1);
  transition: transform 200ms ease-out;
}
CAPIVARA_LIST_KEY .pure-checkbox input[type="radio"]:checked + label:before, .pure-radiobutton input[type="radio"]:checked + label:before {
  animation: borderscale 300ms ease-in;
  background-color: white;
}
CAPIVARA_LIST_KEY .pure-checkbox input[type="radio"]:checked + label:after, .pure-radiobutton input[type="radio"]:checked + label:after { transform: scale(1); }
CAPIVARA_LIST_KEY .pure-checkbox input[type="radio"] + label:before, .pure-radiobutton input[type="radio"] + label:before, .pure-checkbox input[type="radio"] + label:after, .pure-radiobutton input[type="radio"] + label:after { border-radius: 50%; }
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"]:checked + label:before, .pure-radiobutton input[type="checkbox"]:checked + label:before {
  animation: borderscale 200ms ease-in;
  background: CHECKBOX_COLOR;
}
CAPIVARA_LIST_KEY .pure-checkbox input[type="checkbox"]:checked + label:after, .pure-radiobutton input[type="checkbox"]:checked + label:after { transform: rotate(-45deg) scale(1); }
@keyframes
borderscale {  50% {
 box-shadow: 0 0 0 2px CHECKBOX_COLOR;
}
}
`;