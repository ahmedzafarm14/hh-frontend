import { emptySplitApi } from "./emptySplitApi.js";

export const hostelApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addHostel: builder.mutation({
      query: (formData) => ({
        method: "POST",
        url: "/api/hostel/add-hostel/",
        body: formData,
      }),
    }),

    getHostelsForOwner: builder.query({
      query: () => ({
        url: "/api/hostel/get-hostels/",
      }),
    }),

    getHostelsForResident: builder.query({
      query: (location) => ({
        url: "/api/hostel/get-resident-hostels/",
        params: location,
      }),
    }),

    updateHostel: builder.mutation({
      query: (formData) => ({
        method: "PUT",
        url: "/api/hostel/update-hostel/",
        body: formData,
      }),
    }),

    deleteHostel: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/api/hostel/delete-hostel/${id}`,
      }),
    }),
  }),
});

export const {
  useAddHostelMutation,
  useGetHostelsForOwnerQuery,
  useGetHostelsForResidentQuery,
  useUpdateHostelMutation,
  useDeleteHostelMutation,
} = hostelApi;
