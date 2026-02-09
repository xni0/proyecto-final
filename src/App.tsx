import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MainLayout } from "./layout/MainLayout";
import { Home } from "./routes/Home";
import { Search } from "./routes/Search";
import { Genres } from "./routes/Genres";
import { NowPlaying } from "./routes/NowPlaying";
import { MovieDetail } from "./routes/MovieDetail";
import { PersonDetail } from "./routes/PersonDetail";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { NotFound } from "./routes/NotFound";
import { PrivateRoute } from "./guards/PrivateRoute";
import { Favorites } from "./routes/Favorites";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="genres" element={<Genres />} />
            <Route path="now-playing" element={<NowPlaying />} />
            <Route
              path="movie/:id"
              element={
                <PrivateRoute>
                  <MovieDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="person/:id"
              element={
                <PrivateRoute>
                  <PersonDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
