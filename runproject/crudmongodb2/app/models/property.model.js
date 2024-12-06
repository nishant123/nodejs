module.exports = mongoose => {

    
const GallerySchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    // control: { type: mongoose.Schema.Types.ObjectId, ref: "Control" },
    ImagePath: {
      type: String
    }
  });


  const controlPropertytypeSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    // control: { type: mongoose.Schema.Types.ObjectId, ref: "Control" },
    id: {
      type: String,     
    },
    propType: {
      type: String,      
    }
  });
  
    var propertyschema = mongoose.Schema(
      {
        title: String,
        description: String,
        status: String,
        Gallery: [GallerySchema],
        propType: [controlPropertytypeSchema],      

      }
    );
    const property = mongoose.model("property", propertyschema);
    return property;
  };
  