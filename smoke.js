import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function runSmokeTests() {
    try {
        // Register tenant and user
        const tenant = await axios.post(`${API_URL}/auth/register`, {
            organizationName: '72Smoke Test Organization',
            name: '72Smoke Test User',
            email: '72smoketest@example.com',
            password: 'password123',
        });
        console.log('Tenant registration response:', tenant.data);
        console.log('Tenant and user registration successful');

        // Login to get token
        const login = await axios.post(`${API_URL}/auth/login`, {
            email: '72smoketest@example.com',
            password: 'password123',
            organizationId: tenant.data.organization,
        });
        console.log('User login successful');
        const token = login.data.token;

        // Create a product
        const product = await axios.post(
            `${API_URL}/products`,
            {
                name: 'Test Product',
                sku: '554545454',
                quantity: 100,
                lowStockThreshold: 10,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log('Product creation successful');

        // Create a stock movement
        await axios.post(
            `${API_URL}/stock`,
            {
                productId: product.data._id,
                type: 'OUT',
                quantity: 5,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log('Stock movement creation successful');

        // Get dashboard data
        await axios.get(`${API_URL}/dashboard/stats`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Dashboard data retrieval successful');
        console.log('Smoke tests completed successfully');
    } catch (error) {
        console.error('Smoke test failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            console.error('No response received. Request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        console.error('Full error object:', error);
    }
}

runSmokeTests();
