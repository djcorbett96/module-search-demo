import { ComplexImageType } from "@yext/pages-components";

export interface ReviewProps {
  entityId: string;
  entityName?: string;
  entityImage?: ComplexImageType;
  reviewSubmissionLabel?: string;
}

export type EntityReviewAggregate = {
  averageRating: number;
  totalReviews: number;
  totalReviewsByRating: number[];
};

export type ReviewsResponse = {
  count: number;
  docs: {
    $key: {
      locale: string;
      primaryKey: string;
    };
    authorName: string;
    content: string;
    rating: number;
    reviewDate: string;
    entity: {
      id: string;
    };
  }[];
};

export type ReviewSort =
  | "reviewDateDesc"
  | "reviewDateAsc"
  | "ratingDesc"
  | "ratingAsc";

export const reviewSortOptions: Record<
  ReviewSort,
  { key: string; value: string }
> = {
  reviewDateDesc: {
    key: "$sortBy__desc",
    value: "reviewDate",
  },
  reviewDateAsc: {
    key: "$sortBy__asc",
    value: "reviewDate",
  },
  ratingDesc: {
    key: "$sortBy__desc",
    value: "rating",
  },
  ratingAsc: {
    key: "$sortBy__asc",
    value: "rating",
  },
};
