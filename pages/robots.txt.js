import { config } from "config";

const robotsTxt = `# robotstxt.org

User-agent: *

Sitemap: ${config.appUrl}sitemap.xml`;

const RobotsTxt = () => "";

RobotsTxt.getInitialProps = async ({ res }) => {
  if (res.write) {
    res.setHeader("Content-Type", "text/plain");
    res.write(robotsTxt);
    res.end();
  }
  return {}; 
};

export default RobotsTxt;
