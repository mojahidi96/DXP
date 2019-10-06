import { Theme } from './theme-interface';

export const salesTheme: Theme = {
  name: 'SALES',
  properties: {
    /*----------------------------------------variables used in style.scss---------------------------------------------------------*/
    /*body*/
    '--fontFamily':'noto_sansregular',

    /*header section*/
    '--headerBg': '#ffffff',
    '--headerFont': '#464646',
    /*header Logo*/
    '--headerlogo' : 'url(assets/images/logo.png)',
    /* menuslider section*/

    '--menusliderBg': '#0077be',

    /* Theme dropdown section*/
    '--themepicker': 'url(assets/images/theme-icon-trans.jpg)',
    '--primaryColor' : '#6f348d',
    '--primaryBlue': '#0077be',
    '--primaryBlack':'#000000',
    '--primaryRed': '#ab0e27',

    /*app engine dropdown*/
    '--background': '#000000',

    /*sidebar section*/
    '--backgroundImage' : 'url(assets/images/bg-sidebar-login.png)',

    /*footer section*/
    '--footerFont': '#727272',
    '--footerBg': '#ffffff',
    '--footerAnchorTag': '#0077be',

    /*DXP button*/

    '--btnFontSize':'14px',

    '--defaultButton': '#ffffff',
    '--defaultFont': '#333',
    '--defaultBorder': '#ccc',

    '--primaryButton':'#6f348d',
    '--disableButton':'#6f348d',
    '--disableBorder':'#6f348d',
    '--primaryFont':'#ffffff',

    '--strokedBtn': '#ffffff',
    '--strokedFont': '#0077be',
    '--strokedBtnBorder': '#0077be',

    '--radioborder': '#6f348d',
    '--radiobackground': '#6f348d',

    /* dxp-form-group(input style)  and dxp-form-group1 (dxp-input-group)*/
    '--formInputBg': '#fff',
    '--formInputFont': '#495057',
    '--formInputBorder': '#e0e0e0',


    '--inputGroupTextColor': '#495057',
    '--inputGroupTextBg': '#e9ecef',
    '--inputGroupTextBorder': '#ced4da',

    /*Select Tile section*/
    '--selectBg': '#0077be',
    '--selectcheckbox':'#0b4d99',

    /*CheckBox*/
    '--checkMarkChecked': '#6f348d',
    '--checkMarkDisabled': '#b0b0b0',
    '--checkMarkBorder': '#767676',


    /*common*/
    '--inputHoverColor': '#0077be',
    '--errorColor': '#ab0e27',
    '--anchorText': '#0077be',
    '--progressBarDot':'#6f348d',

    /*----------------------------------------additional variables added---------------------------------------------------------*/

    '--primaryLightGrey': '#ebebeb',
    '--disabledTextColor': '#767676',
    '--disabledColor': '#b0b0b0',
    '--inputBorderColor': '#e0e0e0',
    '--inputGroupIconBg': '#e9ecef',
    '--inputGroupIconBorder': '#e9ecef',
    '--placeHolderText': '#7b7b7b',
    '--optionHoverText': '#212121',
    '--optionHover': '#f5f5f5',
    '--pTextColor': '#727272',
    '--borderBottom': '#727272',
    '--iconColor': '#757575',
    '--bodyBGColor': '#000000'
  }
};
