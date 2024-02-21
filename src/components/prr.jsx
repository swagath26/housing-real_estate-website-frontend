const [refetch, setRefetch] = useState(false);

  useEffect (() => {
    if(!isLoading)
      fetchProperties();
    else if(abortController.current) {
      abortController.current.abort();
    }
  }, [currentPage, sortBy, minPriceFilter, maxPriceFilter, minLatFilter, maxlatFilter, minLngFilter, maxlngFilter]);

  useEffect (() => {
    const list_section = document.getElementById("list-section");
    isLoading ? list_section.style.opacity = 0.5 : list_section.style.opacity = 1;
  }, [isLoading]);

  useEffect(() => {
    if(refetch)
      fetchProperties();
  }, [refetch])

  const abortController = useRef(null);

  const fetchProperties = async () => {
    const controller = new AbortController();
    abortController.current = controller;
    try {
      setIsLoading(true);
      const response = await axios.get('/api/properties_list/', {
        params: {
          page: currentPage,
          ordering: sortBy,
          // location: filteredLocation,
          // min_price: minPriceFilter,
          // max_price: maxPriceFilter,
          min_lat: minLatFilter,
          max_lat: maxlatFilter,
          min_lng: minLngFilter,
          max_lng: maxlngFilter,
          // size: filteredSize,
        },
        signal: controller.signal,
      });
      setProperties(response.data.results);
      setPropertyCount(response.data.count);
      setShowCurrentPage(currentPage);
      setPageCount(Math.trunc(response.data.count/pageSize) + 1);
      setError(null);
      setIsLoading(false);
      abortController.current = null;
    }
    catch (error) {
      if (error.name != 'CanceledError') {
        setError(error);
        setIsLoading(false);
        abortController.current = null;
      }
      else {
        setIsLoading(false);
        abortController.current = null;
        setRefetch(true);
        console.log("trigger refetch")
      }
    }
  }