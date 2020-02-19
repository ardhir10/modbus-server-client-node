var controller = {};

controller['SCHNEIDER'] = {
    "options": {
        "host": "10.10.2.14",
        "port": "502",
        "device": "SCHNEIDER",
    },
    "tags": {
        // "curent_A:FloatBE": "2999",
        // "curent_B:FloatBE": "3001",
        // "curent_C:FloatBE": "3003",
        // "curent_N:FloatBE": "3005",
        "curent_Avg:FloatBE": "3009",
        // "curent_Unb_A:FloatBE": "3011",
        // "curent_Unb_B:FloatBE": "3013",
        // "curent_Unb_C:FloatBE": "3015",
        // "curent_Unb_Worst:FloatBE": "3017",
        // "voltage_AB:FloatBE": "3019",
        // "voltage_BC:FloatBE": "3021",
        // "voltage_CA:FloatBE": "3023",
        "voltage_Avg_LL:FloatBE": "3025",
        // "voltage_AN:FloatBE": "3027",
        // "voltage_BN:FloatBE": "3029",
        // "voltage_CN:FloatBE": "3031",
        "voltage_Avg_LN:FloatBE": "3035",
        // "voltage_Unb_AB:FloatBE": "3037",
        // "voltage_Unb_BC:FloatBE": "3039",
        // "voltage_Unb_CA:FloatBE": "3041",
        // "voltage_Unb_Worst_LL:FloatBE": "3043",
        // // "voltage_Unb_AN:FloatBE": "3045",
        // // "voltage_Unb_BN:FloatBE": "3047",
        // // "voltage_Unb_CN:FloatBE": "3049",
        // // "voltage_Unb_Worst_LN:FloatBE": "3051",
        // // "frequency:FloatBE": "3109",
        // // "Active_Power_A:FloatBE": "3053",
        // // "Active_Power_B:FloatBE": "3055",
        // // "Active_Power_C:FloatBE": "3057",
        "Active_Power_Total:FloatBE": "3059",
        // "Reactive_Power_A:FloatBE": "3061",
        // "Reactive_Power_B:FloatBE": "3063",
        // "Reactive_Power_C:FloatBE": "3065",
        "Reactive_Power_Total:FloatBE": "3067",
        // "Apparent_power_A:FloatBE": "3069",
        // "Apparent_power_B:FloatBE": "3071",
        // "Apparent_power_C:FloatBE": "3073",
        "Apparent_power_Total:FloatBE": "3075",
        // "Power_Factor_Total:FloatBE": "3083",
        // "active_energy_Delived:FloatBE": "2699",
        // "reactive_energy_Delived:FloatBE": "2705",
        // "apparent_energy_Delived:FloatBE": "2715"
    }
};

// controller['SOCOMEC'] = {
//     "options": {
//         "host": "127.0.0.1",
//         "port": "502",
//         "device": "SOCOMEC",
//     },
//     "tags": {
//         "curent_Avg:Int16BE": "0001",
//         "voltage_Avg_LL:Int16BE": "0002",
//         "voltage_Avg_LN:Int16BE": "0003",
//         "Active_Power_Total:Int16BE": "0004",
//         "Reactive_Power_Total:Int16BE": "0005",
//         "Apparent_power_Total:Int16BE": "0006",
//     }
// };

// controller['SOCOMEC2'] = {
//     "options": {
//         "host": "127.0.0.1",
//         "port": "503",
//         "device": "SOCOMEC2",
//     },
//     "tags": {
//         "curent_Avg:Int16BE": "0001",
//         "voltage_Avg_LL:Int16BE": "0002",
//         "voltage_Avg_LN:Int16BE": "0003",
//         "Active_Power_Total:Int16BE": "0004",
//         "Reactive_Power_Total:Int16BE": "0005",
//         "Apparent_power_Total:Int16BE": "0006",
//     }
// };

module.exports = controller;