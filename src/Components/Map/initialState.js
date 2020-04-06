const initialState = {
    location: {
        lat: 32.0965791,
        lng: 34.7831877
    },

    loading: true,
    error: false,

    patients: [
        {
            id: 1,
            location: {
                lat: 32.4,
                lng: 35
            },
            status: 'moderate'
        },
        {
            id: 2,
            location: {
                lat: 32,
                lng: 35
            },
            status: 'healthy'
        },
        {
            id: 3,
            location: {
                lat: 31.07,
                lng: 35
            },
            status: 'healthy'
        },
        {
            id: 4,
            location: {
                lat: 31,
                lng: 35
            },
            status: 'sever'
        },
        {
            id: 5,
            location: {
                lat: 30.6,
                lng: 34.8
            },
            status: 'sever'
        },
        {
            id: 6,
            location: {
                lat: 31.790,
                lng: 34.94
            },
            status: 'moderate'
        }
    ]
};

export default initialState