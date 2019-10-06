import {Theme} from './theme-interface';

export const FrontierTheme: Theme = {
  name: 'Frontier',
  properties: {
    /*----------------------------------------variables used in style.scss---------------------------------------------------------*/
    /*body*/
    '--fontFamily':'Nexa W01,Nexa W01 Book,Nexa W01 Black,Nexa Bold,Gotham,Helvetica Neue,Helvetica,Arial,sans-serif',

    /*header section*/
    '--headerBg':'#ffffff',
    '--headerFont':'#464646',

    /*header Logo*/
    '--headerlogo' : 'url(assets/images/PartnerRed.jpg)',

    /* menuslider section*/

    '--menusliderBg': '#d9272d',

    /* Theme dropdown section*/
    '--themepicker': 'url(assets/images/theme-icon-trans.jpg)',
    '--primaryColor' : '#6f348d',
    '--primaryBlue': '#0077be',
    '--primaryBlack':'#000000',
    '--primaryRed': '#d9272d',

    /*app engine dropdown*/
    '--background': '#000000',


    /*footer section*/
    '--footerFont':'#727272',
    '--footerBg':'#ffffff',
    '--footerAnchorTag':'#0077be',

    /* Sidebar section*/
    '--backgroundImage' : 'url(assets/images/frontier-sidebar-w.jpg)',

    /*DXP button*/

    '--btnFontSize':'16px',
    '--defaultButton':'#ffffff',
    '--defaultFont':'#333',
    '--defaultBorder':'#ccc',

    '--primaryButton':'#d9272d',
    //8c0d04 border
    //disable ddd
    '--disableButton':'#999999',
    '--disableBorder':'#666666',
    '--primaryFont':'#ffffff',

    '--radioborder': '#d9272d',
    '--radiobackground': '#d9272d',

    '--strokedBtn':'#ffffff',
    '--strokedFont':'#0077be',
    '--strokedBtnBorder':'#0077be',

    /* dxp-form-group(input style)  and dxp-form-group1 (dxp-input-group)*/
    '--formInputBg':'#fff',
    '--formInputFont':'#495057',
    '--formInputBorder':'#e0e0e0',


    '--inputGroupTextColor':'#495057',
    '--inputGroupTextBg':'#e9ecef',
    '--inputGroupTextBorder':'#ced4da',


    /*CheckBox*/
    '--checkMarkChecked':'#d9272d',
    '--checkMarkDisabled':'#b0b0b0',
    '--checkMarkBorder':'#767676',

    /*Select Tile section*/
    '--selectBg': '#d9272d',
    '--selectcheckbox':'#b0b0b0',

    /*common*/
    '--inputHoverColor': '#0077be',
    '--errorColor': '#ab0e27',
    '--anchorText': '#0077be',
    '--progressBarDot':'#d9272d',


    /*----------------------------------------additional variables added---------------------------------------------------------*/

    '--primaryLightGrey': '#ebebeb',
    '--disabledTextColor': '#767676',
    '--disabledColor': '#ab0e27',
    '--inputBorderColor': '#e0e0e0',
    '--inputGroupIconBg': '#e9ecef',
    '--inputGroupIconBorder': '#e9ecef',
    '--placeHolderText': '#7b7b7b',
    '--optionHoverText': '#212121',
    '--optionHover': '#f5f5f5',
    '--pTextColor': '#727272',
    '--borderBottom':'#727272',
    '--iconColor': '#757575',
    '--bodyBGColor': '#ffffff'
  }
};
