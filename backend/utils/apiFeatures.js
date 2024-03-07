class ApiFeature{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    // search api starts here
    search(){
        console.log("search works")
        const keyword = this.queryStr.keyword
        ? {
            name:{ $regex: this.queryStr.keyword, $options:"i" }
        }: {};
        console.log(keyword)
        this.query = this.query.find({...keyword})
        return this
    } 

    // filter api starts here

    filter(){
        console.log("filter working")
        const queryCopy = { ...this.queryStr }
        const removeFields =["keyword","page","limit"];
        removeFields.forEach((key)=> delete queryCopy[key]);

        // filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, key=> `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this
    }

    // pagination starts here
    pagination(resultPerPage){
        console.log("pagination working")
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this
    }

}

module.exports =ApiFeature