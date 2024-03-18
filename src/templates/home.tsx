import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
} from "@yext/pages";

export const getPath: GetPath<TemplateRenderProps> = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Widgets Demo Repo",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "This repo contains examples of Widgets in Pages.",
        },
      },
    ],
  };
};

const Home: Template<TemplateRenderProps> = ({ document }) => {
  // This is the site object from the Knowledge Graph. It contains all the data
  // for the site entity, and can be accessed in any template, including static templates.
  const { _site } = document;

  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <img
            className="h-11"
            src="https://thumbs.bfldr.com/at/s789nvxj59h4fv4wrqsmskxn?expiry=1710103954&fit=bounds&height=800&sig=OTVhNmM1NWRjY2E5NWFlNThmZDRiN2YwM2MyYmQzZGFlYjhlZmUzMg%3D%3D&width=1100"
            alt="Yext"
          />
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Widgets in Pages JS
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            PagesJS allows you to write React components and use them as widgets
            so that you can add them to your website as a script tag.
          </p>
          <ul className="mt-8 space-y-4">
            <li>
              <a
                href="https://codesandbox.io/p/sandbox/product-page-nmt496?file=/index.html:11,60"
                className="text-blue-500 hover:underline flex items-center"
              >
                <img
                  src="https://cdn3.iconfinder.com/data/icons/feather-5/24/codesandbox-512.png"
                  alt="CodeSandbox"
                  className="h-5 mr-2"
                />
                CodeSandbox Example
              </a>
            </li>
            <li className="flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
                className="h-5 mr-2"
              />
              <a
                href="https://github.com/apav-dev/widgets-demo"
                className="text-blue-500 hover:underline"
              >
                Source Code
              </a>
            </li>
          </ul>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            {/* TODO: Add screenshot of a widget */}
            {/* <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
