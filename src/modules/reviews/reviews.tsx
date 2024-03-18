import { Module, ModuleConfig } from "@yext/pages/*";
import { useEffect, useState } from "react";
import { ReviewSort } from "../../types/reviews";
import { v4 as uuid } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { Stars } from "../../common/Stars";
import { StarIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import ReviewSkeleton from "../../common/ReviewSkeleton";
import ReviewSortDropdown from "../../common/ReviewSortDropdown";
import ReviewSubmissionForm from "../../common/ReviewSubmissionForm";
import { fetchReviewsAggForEntity, fetchReviews } from "../../utils/api";
import { ComplexImageType } from "@yext/pages-components";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const REVIEWS_LIMIT = 5;

// api_key: 1316c9fafd65fd4518e69100166461a7
// v: 20221114
// const entityId = "nordica_enforcer_100_skis_2023";
const entityName = "Nordica Enforcer 100 Skis 2023";
const entityImage: ComplexImageType = {
  image: {
    url: "https://dynl.mktgcdn.com/p/9HHWk0KY7CfbZz6f8MTbkl98CiSFvZ9ySUxzCC2sKmM/1920x1920",
    width: 1920,
    height: 1920,
  },
};
// $sortBy__desc: reviewDate
// limit: 5

export const config: ModuleConfig = {
  // name overrides the file name
  name: "reviews",
};

export const ReviewsWidget = () => {
  const [entityId, setEntityId] = useState("");
  const [showReviewSubmissionForm, setShowReviewSubmissionForm] =
    useState(false);
  const [sort, setSort] = useState<ReviewSort>("reviewDateDesc");

  const reviewsAggResponse = useQuery({
    queryKey: ["reviewsForEntity", entityId],
    queryFn: () => fetchReviewsAggForEntity(entityId),
    retry: 0,
  });

  const reviewsResponse = useQuery({
    queryKey: ["reviews", entityId, sort],
    queryFn: () => fetchReviews(entityId, sort),
    retry: 0,
  });

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const setEntityIdFromQueryParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const entityIdParam = urlParams.get("entityId");
    if (entityIdParam) {
      setEntityId(entityIdParam);
    }
  };

  useEffect(() => {
    setEntityIdFromQueryParam();
  }, []);

  useEffect(() => {
    if (!showReviewSubmissionForm) {
      reviewsAggResponse.refetch();
      reviewsResponse.refetch();
    }
  }, [showReviewSubmissionForm]);

  return (
    <div className="tailwind">
      <div className="col-span-2 mt-16 sm:mt-24">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-4">
              <h2 className="text-lg font-medium text-gray-900">
                Customer Reviews
              </h2>

              <div className="mt-3 flex items-center">
                <div>
                  <div className="flex items-center">
                    <Stars
                      rating={reviewsAggResponse.data?.averageRating || 0}
                    />
                  </div>
                  <p className="sr-only">{5} out of 5 stars</p>
                </div>
                {reviewsAggResponse.data?.totalReviews && (
                  <p className="ml-2 text-sm text-gray-900">
                    Based on {reviewsAggResponse.data?.totalReviews || 0}{" "}
                    reviews
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Review data</h3>

                <dl className="space-y-3">
                  {(
                    reviewsAggResponse.data?.totalReviewsByRating || [
                      0, 0, 0, 0, 0,
                    ]
                  ).map((count, i) => (
                    <div key={uuid()} className="flex items-center text-sm">
                      <dt className="flex flex-1 items-center">
                        <p className="w-3 font-medium text-gray-900">
                          {5 - i}
                          <span className="sr-only"> star reviews</span>
                        </p>
                        <div
                          aria-hidden="true"
                          className="ml-1 flex flex-1 items-center"
                        >
                          <StarIcon
                            className={twMerge(
                              count > 0 ? "text-yellow-400" : "text-gray-300",
                              "h-4 w-4 flex-shrink-0"
                            )}
                            aria-hidden="true"
                            key={uuid()}
                          />

                          <div className="relative ml-3 flex-1">
                            <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                            {count > 0 ? (
                              <div
                                className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                style={{
                                  width: `calc(${count} / ${reviewsAggResponse.data?.totalReviews} * 100%)`,
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </dt>
                      <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                        {count > 0
                          ? Math.round(
                              (count /
                                (reviewsAggResponse.data?.totalReviews ?? 0)) *
                                100
                            )
                          : 0}
                        %
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">
                  Share your thoughts
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  If you’ve used this product, share your thoughts with other
                  customers
                </p>

                <button
                  type="button"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                  onClick={() => setShowReviewSubmissionForm(true)}
                >
                  Write a review
                </button>
              </div>
              <ReviewSubmissionForm
                entityId={entityId}
                open={showReviewSubmissionForm}
                setOpen={setShowReviewSubmissionForm}
                entityName={entityName}
                entityImage={entityImage}
              />
            </div>

            <div className="lg:col-span-7 lg:col-start-6 lg:mt-0">
              <>
                <h3 className="sr-only">Recent reviews</h3>
                <div className="flow-root -my-12">
                  <div className="my-12 divide-y divide-gray-200">
                    {reviewsResponse.isLoading && // create REVIEW_LIMIT number of skeleton cards
                      [...Array(REVIEWS_LIMIT)].map((_, i) => (
                        <ReviewSkeleton key={i} />
                      ))}
                    {reviewsResponse.isSuccess && reviewsResponse.data.docs && (
                      <>
                        <div className="flex justify-end">
                          <ReviewSortDropdown
                            selectedSort={sort}
                            setSelectedSort={(s) => setSort(s)}
                          />
                        </div>
                        {reviewsResponse.data.docs.map((review) => (
                          <div key={uuid()} className="py-12">
                            <div className="flex items-center">
                              <div className="">
                                <div className="flex items-center">
                                  <h4 className="text-sm font-bold text-gray-900">
                                    {review.authorName}
                                  </h4>
                                  <p className="pl-4 text-xs font-normal">
                                    {formatDate(review.reviewDate)}
                                  </p>
                                </div>
                                <div className="mt-1 -ml-1 flex items-center">
                                  <Stars
                                    aria-hidden="true"
                                    rating={review.rating}
                                  />
                                </div>
                                <p className="sr-only">
                                  {review.rating} out of 5 stars
                                </p>
                              </div>
                            </div>

                            <div
                              className="mt-4 space-y-6 text-base italic text-gray-600"
                              // TODO: remove dangerouslySetInnerHTML
                              dangerouslySetInnerHTML={{
                                __html: review.content,
                              }}
                            />
                          </div>
                        ))}
                      </>
                    )}
                    {reviewsResponse.isSuccess &&
                      !reviewsResponse.data.docs && (
                        <div className="pt-16">
                          <p className="text-center w-full text-lg font-medium pt-16">
                            Be the first to review this product!
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const Reviews: Module = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReviewsWidget />
    </QueryClientProvider>
  );
};

export default Reviews;
