//global.FOO = 5

const FOO = 5;
const scrapperFieldMapping = {
    'make_url': 'make_url',
    'model_url': 'model_url',
    'variant_url': 'variant_url',
    'domain': 'domain',
    'domain_unique_id': 'domain_unique_id',
    'make': 'make',
    'model': 'model',
    'variant': 'variant',
    'img_url': 'img_url',
    'price': 'price',
    'Length': 'length',
    'Width': 'width',
    'Height': 'height',
    'Seating Capacity': 'seating_capacity',
    'Displacement': 'displacement',
    'Fuel Type': 'fuel_type',
    'Max Power': 'max_power',
    'Max Torque': 'max_torque',
    'Alternate Fuel': 'alternate_fuel',
    'Transmission Type': 'transmission_type',
    'No of gears': 'no_of_gears',
    'Drivetrain': 'drivetrain',
    'Air Conditioner': 'air_conditioner',
    'Power Windows': 'power_windows',
    'Central Locking': 'central_locking',
    'Anti-Lock Braking System (ABS)': 'abs',
    'Airbags': 'airbags',
    'Seat Upholstery': 'seat_upholstery',
    'Front Tyres': 'front_tyres',
    'Rear Tyres': 'rear_tyres',
    'Wheelbase': 'wheelbase',
    'Ground Clearance': 'ground_clearance',
    'Kerb Weight': 'kerb_weight',
    'Doors': 'doors',
    'No of Seating Rows': 'no_of_seating_rows',
    'Bootspace': 'bootspace',
    'Fuel Tank Capacity': 'fuel_tank_capacity',
    'Engine Type': 'engine_type',
    'Turbocharger/Supercharger': 'turbocharger_supercharger',
    'Valve/Cylinder (Configuration)': 'valve_cylinder',
    'Dual Clutch': 'dual_clutch',
    'Sport Mode': 'sport_mode',
    'Cylinders': 'cylinders',
    'Max Power (bhp@rpm)': 'max_power_bhp',
    'Max Torque (Nm@rpm)': 'max_torque_rpm',
    'Turbocharger Type': 'turbocharger_type',
    'Manual Shifting for Automatic': 'manual_shifting_for_automatic',
    'Driving Modes': 'driving_modes',
    'Suspension Front': 'suspension_front',
    'Suspension Rear': 'suspension_rear',
    'Front Brake Type': 'front_brake_type',
    'Rear Brake Type': 'rear_brake_type',
    'Steering Type': 'steering_type',
    'Wheels': 'wheels',
    'Spare Wheel': 'spare_wheel',
    'Dual-Stage Airbags': 'dual_stage_airbags',
    'Middle rear three-point seatbelt': 'middle_rear_three_point_seatbelt',
    'Middle Rear Head Rest': 'middle_rear_head_rest',
    'Child Seat Anchor Points': 'child_seat_anchor_points',
    'Seat Belt Warning': 'seat_belt_warning',
    'Brake Assist (BA)': 'brake_assist',
    'Four-Wheel-Drive': 'four_wheel_drive',
    'Hill Hold Control': 'hill_hold_control',
    'Hill Descent Control': 'hill_descent_control',
    'Differential Lock': 'differential_lock',
    'Engine immobilizer': 'engine_immobilizer',
    'Speed Sensing Door Lock': 'speed_sensing_door_lock',
    'Child Safety Lock': 'child_safety_lock',
    'Rear AC': 'rear_ac',
    '12V Power Outlets': 'power_outlets_12_v',
    'Steering Adjustment': 'steering_adjustment',
    'Keyless Start/ Button Start': 'keyless_start_button_start',
    'Parking Sensors': 'parking_sensors',
    'Cabin-Boot Access': 'cabin_boot_access',
    'Heater': 'heater',
    'Headlight off and lgnition Key Off Reminder': 'headlight_off_and_lgnition_key_off_reminder',
    'Anti-glare Mirrors': 'anti_glare_mirrors',
    'Leather-wrapped Steering Wheel': 'leather_wrapped_steering_wheel',
    'Leather-wrapped Gear Knob': 'leather_wrapped_gear_knob',
    'Driver Seat Adjustment': 'driver_seat_adjustment',
    'Head-rests': 'head_rests',
    'Front Passenger Seat Adjustment': 'front_passenger_seat_adjustment',
    'Lumbar Support': 'lumbar_support',
    'Driver Armrest': 'driver_armrest',
    'Rear Passenger Seats': 'rear_passenger_seats',
    'Rear Passenger Adjustable seats': 'rear_passenger_adjustable_seats',
    '3rd Row Seats': '3rd_row_seats',
    '3rd Row Seat Adjustment': '3rd_row_seat_adjustment',
    'Ventilated Seats': 'ventilated_seats',
    'Ventilated Seat Type': 'ventilated_seat_type',
    'Interiors': 'interiors',
    'Rear Armrest': 'rear_armrest',
    'Folding Rear Seat': 'folding_rear_seat',
    'Split Rear Seat': 'split_rear_seat',
    'Split Third Row Seat': 'split_third_row_seat',
    'Front Seat Pockets': 'front_seat_pockets',
    'Adjustable Head-rests': 'adjustable_head_rests',
    'Electrically Adjustable Headrests': 'electrically_adjustable_headrests',
    'Cup Holders': 'cup_holders',
    'Driver Armrest Storage': 'driver_armrest_storage',
    'Cooled Glove Box': 'cooled_glove_box',
    'Sunglass Holder': 'sunglass_holder',
    'Third Row Cup Holders': 'third_row_cup_holders',
    'One Touch -Down': 'one_touch_down',
    'One Touch - Up': 'one_touch_up',
    'Outside Rear View Mirrors (ORVMs)': 'outside_rear_view_mirrors',
    'Adjustable ORVM': 'adjustable_orvm',
    'Turn Indicators on ORVM': 'turn_indicators_on_orvm',
    'Rear Defogger': 'rear_defogger',
    'Rear Wiper': 'rear_wiper',
    'Exterior Door Handles': 'exterior_door_handles',
    'Interior Door Handles': 'interior_door_handles',
    'Rain-sensing Wipers': 'rain_sensing_wipers',
    'Door Pockets': 'door_pockets',
    'Door Blinds': 'door_blinds',
    'Rear Window Blind': 'rear_window_blind',
    'Roof rails': 'roof_rails',
    'Roof Mounted Antenna': 'roof_mounted_antenna',
    'Body-Coloured Bumpers': 'body_coloured_bumpers',
    'Chrome Finish Exhaust pipe': 'chrome_finish_exhaust_pipe',
    'Body Kit': 'body_kit',
    'Cornering Headlights': 'cornering_headlights',
    'Headlamps': 'headlamps',
    'Automatic Head Lamps': 'automatic_head_lamps',
    'Follow me home headlamps': 'follow_me_home_headlamps',
    'Daytime Running Lights': 'daytime_running_lights',
    'Fog Lamps': 'fog_lamps',
    'Tail Lamps': 'tail_lamps',
    'Cabin Lamps': 'cabin_lamps',
    'Headlight Height Adjuster': 'headlight_height_adjuster',
    'Glove Box Lamp': 'glove_box_lamp',
    'Lights on Vanity Mirrors': 'lights_on_vanity_mirrors',
    'Rear Reading Lamp': 'rear_reading_lamp',
    'Instrument Cluster': 'instrument_cluster',
    'Trip Meter': 'trip_meter',
    'Average Fuel Consumption': 'average_fuel_consumption',
    'Average Speed': 'average_speed',
    'Distance to Empty': 'distance_to_empty',
    'Clock': 'clock',
    'Low Fuel Level Warning': 'low_fuel_level_warning',
    'Door Ajar Warning': 'door_ajar_warning',
    'Gear Indicator': 'gear_indicator',
    'Heads Up Display (HUD)': 'heads_up_display',
    'Tachometer': 'tachometer',
    'Shift Indicator': 'shift_indicator',
    'Instantaneous Consumption': 'instantaneous_consumption',
    'Integrated (in-dash) Music System': 'music_system',
    'Head Unit Size': 'head_unit_size',
    'Display': 'display',
    'Display Screen for Rear Passengers': 'display_screen_for_rear_passengers',
    'GPS Navigation System': 'gps_navigation_system',
    'Speakers': 'speakers',
    'USB Compatibility': 'usb_compatibility',
    'Aux Compatibility': 'aux_compatibility',
    'Bluetooth Compatibility': 'bluetooth_compatibility',
    'MP3 Playback': 'mp3_playback',
    'CD Player': 'cd_player',
    'DVD Playback': 'dvd_playback',
    'AM/FM Radio': 'am_fm_radio',
    'iPod Compatibility': 'ipod_compatibility',
    'Internal Hard-drive': 'internal_hard_drive',
    'Steering mounted controls': 'steering_mounted_controls',
    'Voice Command': 'voice_command',
    'Warranty (Years)': 'warranty_years',
    'Warranty (Kilometres)': 'warranty_kilometres',
    'color': 'color'
};


const  getFormatNo = (priceStr) => {
    let actPrice = priceStr.toLowerCase().trim();
    if ((actPrice.indexOf('crores') >= 0)) {
        actPrice = 10000000 * (actPrice.replace(/crores/g, "").trim());
    } else if ((actPrice.indexOf('crore') >= 0)) {
        actPrice = 10000000 * (actPrice.replace(/crore/g, "").trim());
    }else if ((actPrice.indexOf('cr') >= 0)) {
        actPrice = 10000000 * (actPrice.replace(/cr/g, "").trim());
    }else if ((actPrice.indexOf('lakhs') >= 0)) {
        actPrice = 100000 * (actPrice.replace(/lakhs/g, "").trim());
    } else if ((actPrice.indexOf('lakh') >= 0)) {
        actPrice = 100000 * (actPrice.replace(/lakh/g, "").trim());
    }
    return Math.round(actPrice);
};

const getTime = () => {
    return (new Date()).toString().split(' ').splice(1, 3).join(' ');
}
const getIndianFormat = (x) => {
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
};

const titleCase = (str) => {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
};

exports.scrapperFieldMapping = scrapperFieldMapping;
exports.getFormatNo = getFormatNo;
exports.getTime = getTime;
exports.getIndianFormat = getIndianFormat;
exports.titleCase = titleCase;