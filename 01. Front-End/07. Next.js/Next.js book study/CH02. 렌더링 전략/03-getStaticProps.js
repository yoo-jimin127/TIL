import fetch from 'isomorphic-unfetch';
import Dashboard from './components/Dashboard';

export async function getStaticProps() {
    const userReq = await fetch('/api/server');
    const userData = await userReq.json();

    const dashboardReq = await fetch('/api/dashboard');
    const dashboardData = await dashboardReq.json();

    return {
        props: {
            user: userData,
            data: dashboardData,
        },
        revalidate: 600 // 시간을 초 단위로 나타낸 값 10분
    };
}

function IndexPage(props) {
    return (
        <div>
            <Dashboard
                user={props.user}
                data={props.data}
            />
        </div>
    );
}

export default IndexPage;