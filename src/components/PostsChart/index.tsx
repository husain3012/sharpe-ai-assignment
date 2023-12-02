import { USER } from "content/config";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { IPost } from "types/common";

const PostsChart = ({ allPosts }: { allPosts: IPost[] }) => {
  const numberOfUserPosts = allPosts.reduce(
    (a, curr) => (curr.userId == USER.id ? a + 1 : a),
    0
  );

  const numberOfPostsPerUser = allPosts.reduce(
    (a, curr) => ({ ...a, [curr.userId]: (a[curr.userId] || 0) + 1 }),
    {} as Record<number, number>
  );
  const barGraphData = Object.keys(numberOfPostsPerUser).map((k) => ({
    name: k,
    count: numberOfPostsPerUser[parseInt(k)],
  }));

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <UserPieChart total={allPosts.length} byUser={numberOfUserPosts} />
      <PostsBarChart data={barGraphData} />
    </div>
  );
};

export default PostsChart;

const UserPieChart = ({ total, byUser }: { total: number; byUser: number }) => {
  const pieChartData = [
    { name: "Others", value: total - byUser, color: "#29ADB2" },
    { name: "You", value: byUser, color: "#C5E898" },
  ];
  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <figure className="px-10 pt-10 h-60 w-60 mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              dataKey="value"
              outerRadius={60}
              innerRadius={40}
              animationDuration={1400}
              paddingAngle={0}
              enableBackground="sax"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </figure>
      <div className="card-body items-center text-center">
        {/* <h2 className="card-title">Posts</h2> */}
        <p>Number of posts made my you.</p>
      </div>
    </div>
  );
};

const PostsBarChart = ({
  data,
}: {
  data: { name: string; count: number }[];
}) => {
  console.log(data);
  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <figure className="px-10 pt-10 h-60 w-60 mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={data}>
            <Bar dataKey="count" fill="#8884d8" />
            <Legend />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </figure>
      <div className="card-body items-center text-center">
        {/* <h2 className="card-title">Posts</h2> */}
        <p>Number of posts per user.</p>
      </div>
    </div>
  );
};
