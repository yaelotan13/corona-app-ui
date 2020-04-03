const initialState = {

    location: {
        lat: 0,
        lng: 0
    },

    loading: false,
    error: null,

    patients: [
        {
            location: {
                lat: 32.4,
                lng: 35
            },
            status: 'moderate'
        },
        {
            location: {
                lat: 32,
                lng: 35
            },
            status: 'healthy'
        },
        {
            location: {
                lat: 31.07,
                lng: 35
            },
            status: 'healthy'
        },
        {
            location: {
                lat: 31,
                lng: 35
            },
            status: 'sever'
        },
        {
            location: {
                lat: 30.6,
                lng: 34.8
            },
            status: 'sever'
        },
        {
            location: {
                lat: 31.790,
                lng: 34.94
            },
            status: 'moderate'
        }
    ]
};

export default initialState