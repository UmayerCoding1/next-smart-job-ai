

export async function GET(contex: {params: Promise<{username: string}>}) {
    try {
        const userName = await contex.params;
        console.log('api userName', userName);
    } catch (error) {
        console.log('User find by username error', error);
    }
}