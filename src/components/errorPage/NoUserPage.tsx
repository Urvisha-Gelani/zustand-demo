import React from "react";
import { commonUser } from "../../common/Common";
import { Link } from "react-router-dom";

function NoUserPage() {
  const gender = commonUser()?.gender;
  return (
    <>
      <div className="py-10">
        <div className="text-center">
          {/* <p className="text-base font-semibold text-black">404</p> */}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Sorry, we couldn&amp;apos:t find the page you&#x27;re looking for.
          </p>
          <div className="mt-4 flex items-center justify-center gap-x-3">
            <Link
            to={gender === "F" ? "/female-user" : "/male-user"}
              type="button"
              className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Go back
            </Link>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default NoUserPage;
