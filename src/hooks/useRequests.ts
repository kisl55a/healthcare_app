import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRequests,
  addRequest,
  deleteRequest,
  updateRequest,
  REQUESTS_KEY
} from "../services/requestsService";

export const useRequests = () => {
  const queryClient = useQueryClient();

  const requestsQuery = useQuery({
    queryKey: [REQUESTS_KEY],
    queryFn: fetchRequests,
  });

  const addRequestMutation = useMutation({
    mutationFn: addRequest,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [REQUESTS_KEY] });
    },
  });

  const updateRequestMutation = useMutation({
    mutationFn: updateRequest,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [REQUESTS_KEY] });
    },
  });

  const deleteRequestMutation = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [REQUESTS_KEY] });
    },
  });

  return {
    requestsQuery,
    addRequestMutation,
    deleteRequestMutation,
    updateRequestMutation
  };
};