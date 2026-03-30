import { useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [dark, setDark] = useState(true);

  const fetchUser = async () => {
    try {
      const userRes = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const repoRes = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );

      setUser(userRes.data);
      setRepos(repoRes.data);
    } catch {
      alert("User not found");
    }
  };

  const languageCount: any = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] =
        (languageCount[repo.language] || 0) + 1;
    }
  });

  const chartData = Object.keys(languageCount).map((lang) => ({
    name: lang,
    value: languageCount[lang],
  }));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark
          ? "linear-gradient(to right, #0f172a, #1e293b)"
          : "linear-gradient(to right, #e2e8f0, #ffffff)",
        color: dark ? "white" : "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem" }}>DevPulse 🚀</h1>

      <button
        onClick={() => setDark(!dark)}
        style={{
          marginTop: "10px",
          padding: "8px 15px",
          borderRadius: "20px",
          border: "none",
          backgroundColor: dark ? "#334155" : "#cbd5f5",
          cursor: "pointer",
        }}
      >
        {dark ? "🌙 Dark" : "☀️ Light"}
      </button>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search GitHub user..."
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            width: "250px",
          }}
        />

        <button
          onClick={fetchUser}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {user && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "15px",
            backgroundColor: dark ? "#1e293b" : "#ffffff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            textAlign: "center",
            width: "300px",
          }}
        >
          <img
            src={user.avatar_url}
            width="100"
            style={{ borderRadius: "50%" }}
          />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <p>👥 Followers: {user.followers}</p>
          <p>📦 Repos: {user.public_repos}</p>
        </div>
      )}

      {chartData.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            backgroundColor: dark ? "#1e293b" : "#fff",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            📊 Language Usage
          </h2>

          <PieChart width={400} height={300}>
            <Pie data={chartData} dataKey="value" outerRadius={100}>
              {chartData.map((_, index) => (
                <Cell key={index} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      )}
    </div>
  );
}

export default App;