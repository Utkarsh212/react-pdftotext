import { useState, useEffect } from "react";

interface PackageMetadata {
  downloads: number | null;
  version: string | null;
  stars: number | null;
  license: string | null;
  loading: boolean;
  error: string | null;
}

const CACHE_KEY = "react-pdftotext-stats";
const CACHE_DURATION = 3600 * 1000; // 1 hour

export function usePackageMetadata() {
  const [metadata, setMetadata] = useState<PackageMetadata>({
    downloads: null,
    version: null,
    stars: null,
    license: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      // Check Cache
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setMetadata({ ...data, loading: false, error: null });
          return;
        }
      }

      try {
        const registryRes = await fetch(
          "https://registry.npmjs.org/react-pdftotext/latest"
        );
        if (!registryRes.ok) throw new Error("Failed to fetch registry data");
        const registryData = await registryRes.json();

        const version = registryData.version;
        const license = registryData.license;
        const repoUrl = registryData.repository?.url || "";

        const downloadsRes = await fetch(
          "https://api.npmjs.org/downloads/point/last-week/react-pdftotext"
        );
        let downloads = 0;
        if (downloadsRes.ok) {
          const downloadsData = await downloadsRes.json();
          downloads = downloadsData.downloads;
        }

        let stars = 0;
        if (repoUrl) {
          const match = repoUrl.match(/github\.com[\/:]([^\/]+)\/([^\.]+)/);
          if (match) {
            const owner = match[1];
            const repo = match[2];
            const githubRes = await fetch(
              `https://api.github.com/repos/${owner}/${repo}`
            );
            if (githubRes.ok) {
              const githubData = await githubRes.json();
              stars = githubData.stargazers_count;
            }
          }
        }

        const newData = { downloads, version, stars, license };

        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: newData,
            timestamp: Date.now(),
          })
        );

        setMetadata({ ...newData, loading: false, error: null });
      } catch (err) {
        console.error(err);
        setMetadata((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load stats",
        }));
      }
    };

    fetchMetadata();
  }, []);

  return metadata;
}
