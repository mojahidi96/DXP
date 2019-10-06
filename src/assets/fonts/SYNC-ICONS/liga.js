/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'creditcard-solid': '&#xe97e;',
            'gamepad-solid': '&#xe985;',
            'newspaper-solid': '&#xe986;',
            'soup-solid': '&#xe987;',
            'theatre-solid': '&#xe988;',
            'thinking-solid': '&#xe989;',
            'tools-solid': '&#xe98a;',
            'comment-solid': '&#xe975;',
            'emptycat': '&#xe976;',
            'entertain-solid': '&#xe977;',
            'finance-solid': '&#xe978;',
            'food-solid': '&#xe979;',
            'game-solid': '&#xe97a;',
            'sport-solid': '&#xe97f;',
            'travel-solid': '&#xe980;',
            'userempty': '&#xe981;',
            'utilities-solid': '&#xe982;',
            'yen-solid': '&#xe983;',
            'yen': '&#xe984;',
            'download': '&#xe974;',
            'image_solid_add': '&#xe972;',
            'image_solid': '&#xe973;',
            'upload': '&#xe971;',
            'dial': '&#xe96e;',
            'throttle': '&#xe96e;',
            'stack': '&#xe96f;',
            'bundle': '&#xe96f;',
            'search_results': '&#xe970;',
            'barcode_scanner': '&#xe96c;',
            'qr_code_scanner': '&#xe96c;',
            'passcode': '&#xe96d;',
            'otp': '&#xe96d;',
            'calendar_solid': '&#xe927;',
            'calendar': '&#xe928;',
            'action_queue': '&#xe904;',
            'action_menu_solid': '&#xe90a;',
            'action_menu': '&#xe90c;',
            'briefcase_solid': '&#xe90e;',
            'briefcase': '&#xe90f;',
            'calendar_day': '&#xe910;',
            'chat_bot_solid': '&#xe912;',
            'chat_bot': '&#xe913;',
            'comments': '&#xe914;',
            'copy': '&#xe915;',
            'duplicate': '&#xe915;',
            'delete_solid': '&#xe916;',
            'delete': '&#xe917;',
            'edit_solid': '&#xe918;',
            'edit': '&#xe919;',
            'ellipsis_solid': '&#xe91a;',
            'ellipsis': '&#xe91b;',
            'email_draft_solid': '&#xe91c;',
            'email_draft': '&#xe91d;',
            'email_solid': '&#xe91e;',
            'email': '&#xe91f;',
            'folder_open': '&#xe920;',
            'folder_solid': '&#xe921;',
            'folder': '&#xe922;',
            'globe_solid': '&#xe923;',
            'globe': '&#xe924;',
            'help_solid': '&#xe925;',
            'help': '&#xe926;',
            'info_solid': '&#xe929;',
            'info': '&#xe92a;',
            'link': '&#xe92b;',
            'list_view': '&#xe92c;',
            'lock_solid': '&#xe92d;',
            'lock': '&#xe92e;',
            'manage_columns': '&#xe92f;',
            'messages_solid': '&#xe930;',
            'messages': '&#xe931;',
            'mosaic_solid': '&#xe932;',
            'nav_activity_solid': '&#xe932;',
            'mosaic': '&#xe933;',
            'nav_activity': '&#xe933;',
            'notifications_solid': '&#xe934;',
            'notifications': '&#xe935;',
            'pending_solid': '&#xe936;',
            'clock_solid': '&#xe936;',
            'pending': '&#xe937;',
            'clock': '&#xe937;',
            'pin_solid': '&#xe938;',
            'pin': '&#xe939;',
            'profile_solid': '&#xe93a;',
            'profile': '&#xe93b;',
            'refresh': '&#xe93c;',
            'search': '&#xe93d;',
            'settings_solid': '&#xe93e;',
            'settings': '&#xe93f;',
            'sort': '&#xe940;',
            'star_solid': '&#xe941;',
            'star': '&#xe942;',
            'tile_view_solid': '&#xe943;',
            'tile_view': '&#xe944;',
            'unlocked': '&#xe945;',
            'users_solid': '&#xe946;',
            'users': '&#xe947;',
            'warning': '&#xe948;',
            'workspace_solid': '&#xe949;',
            'workspace': '&#xe94a;',
            'wrench_solid': '&#xe94b;',
            'wrench': '&#xe94c;',
            'attachment': '&#xe94d;',
            'barchart_solid': '&#xe94e;',
            'barchart': '&#xe94f;',
            'calendar_day_solid': '&#xe950;',
            'caret_left': '&#xe951;',
            'caret_right': '&#xe952;',
            'caret_up': '&#xe953;',
            'chevron_left': '&#xe954;',
            'chevron_right': '&#xe955;',
            'chevron_up': '&#xe956;',
            'content_connector': '&#xe957;',
            'emails_solid': '&#xe958;',
            'emails': '&#xe959;',
            'exchange_solid': '&#xe95a;',
            'exchange': '&#xe95b;',
            'flag_solid': '&#xe95c;',
            'flag': '&#xe95d;',
            'minus': '&#xe95e;',
            'portal_connectors': '&#xe95f;',
            'portal_libraries': '&#xe960;',
            'reply_all_solid': '&#xe961;',
            'reply_all': '&#xe962;',
            'reply_solid': '&#xe963;',
            'reply': '&#xe964;',
            'right_arrow': '&#xe965;',
            'send_solid': '&#xe966;',
            'send': '&#xe967;',
            'share_solid': '&#xe968;',
            'share': '&#xe969;',
            'sync': '&#xe96a;',
            'unread': '&#xe96b;',
            'like': '&#xe90d;',
            'logout': '&#xe90b;',
            'hide': '&#xe908;',
            'show': '&#xe909;',
            'back': '&#xe900;',
            'caret': '&#xe901;',
            'checkmark': '&#xe902;',
            'tick': '&#xe902;',
            'chevron_down': '&#xe903;',
            'phone': '&#xe905;',
            'call': '&#xe905;',
            'plus': '&#xe906;',
            'add': '&#xe906;',
            'close': '&#xe907;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/icomoon-liga/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
