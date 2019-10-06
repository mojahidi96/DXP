import {Theme} from './theme-interface';

export const PartnerXTheme: Theme = {
  name: 'PartnerX',
  properties: {
    /*----------------------------------------variables used in style.scss---------------------------------------------------------*/
    /*body*/
    '--fontFamily':'noto_sansregular',

    /*header section*/
    '--headerBg': '#000000',
    '--headerFont': '#ffffff',

    /*header Logo*/
    '--headerlogo' : 'url(assets/images/partnerx_logo.png)',


    /* menuslider section*/

    '--menusliderBg': '#000000',

    /* Theme dropdown section*/
    '--themepicker': 'url(assets/images/theme-icon-trans.jpg)',
    '--primaryColor' : '#6f348d',
    '--primaryBlue': '#0077be',
    '--primaryBlack':'#000000',
    '--primaryRed': '#ab0e27',

    /*app engine dropdown*/
    '--background': '#ffffff',



    /*footer section*/
    '--footerFont': '#727272',
    '--footerBg': '#ffffff',
    '--footerAnchorTag': '#0077be',

    /* Sidebar section*/
    '--backgroundImage' : 'url(assets/images/sidebar.png)',

    /*DXP button*/

    '--btnFontSize':'14px',

    '--defaultButton': '#ffffff',
    '--defaultFont': '#333',
    '--defaultBorder': '#ccc',

    '--primaryButton':'#000000',
    '--primaryFont':'#ffffff',
    '--disableButton':'#000000',
    '--disableBorder':'#000000',

    '--radioborder': '#767676',
    '--radiobackground': '#767676',

    '--strokedBtn': '#ffffff',
    '--strokedFont': '#0077be',
    '--strokedBtnBorder': '#0077be',

    /* dxp-form-group(input style)  and dxp-form-group1 (dxp-input-group)*/
    '--formInputBg': '#fff',
    '--formInputFont': '#495057',
    '--formInputBorder': '#e0e0e0',


    '--inputGroupTextColor': '#495057',
    '--inputGroupTextBg': '#e9ecef',
    '--inputGroupTextBorder': '#ced4da',

    /*Select Tile section*/
    '--selectBg': '#b0b0b0',
    '--selectcheckbox':'#757575',

    /*CheckBox*/
    '--checkMarkChecked': '#696969',
    '--checkMarkDisabled': '#b0b0b0',
    '--checkMarkBorder': '#767676',


    /*common*/
    '--inputHoverColor': '#0077be',
    '--errorColor': '#ab0e27',
    '--anchorText': '#0077be',
    '--progressBarDot':'#212121',


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
    '--bodyBGColor': '#ffffff'

  }
};
