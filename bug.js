```javascript
// Assuming you have a MongoDB collection named 'users'

db.users.aggregate([
  {
    $match: { age: { $gt: 25 } }
  },
  {
    $group: {
      _id: "$city",
      averageAge: { $avg: "$age" }
    }
  }
])
```
This aggregation pipeline attempts to calculate the average age of users above 25 years old grouped by city.
However, if the 'age' field is not always a number (perhaps it contains strings or null values), the `$avg` operator will throw an error.  MongoDB's error messages aren't always the clearest in these cases, leading to confusion.

Another less obvious error is using `$group` without a proper `_id` field. If you are grouping by a field that is sometimes null, it can result in unexpected behavior or errors. The `$group` operator requires a unique identifier and will throw an error if the `_id` field cannot be used to produce unique groups, even when the field may be legitimately null.

Incorrect use of `$lookup` can also cause unexpected behavior. If the 'localField' or 'foreignField' in a `$lookup` stage don't precisely match data types or schemas, you could get unexpected aggregation results or silent failures.