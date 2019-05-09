# Stardew Valley farm planner
Source code of https://stardew.info/planner/

# Author
Henrik Peinar @hpeinar

# Special note
This project is built with tools offered by [JetBrains](https://www.jetbrains.com)     
![JetBrains](https://stardew.info/planner/img/jetbrains-logo.png)

# How to contribute
- Make PR
- I'll review it and merge if it checks out
- I'll update https://stardew.info/planner/ with your code in it so other people can also enjoy new features
- I'll add you to contributors list (feel free to do so in the PR).

# Some stuff that community has asked but are not yet implemented
- Count for different stuff placed (how many sprinkers, roads etc)
- Image export
- More trees, tappers.
- Depth rendering so buildings etc could be fully drawn out
- Save exporting
- Better highlights
- Also would be cool to have list of done plans

# Donate
Donations in any sum are very appreciated.     
[![](https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7SC54QGXFXF6C)

# Installation & running
## Alternative 1
`npm install`    
`node index.js`     
`open http://127.0.0.1:3000`

# Contributors
- [rgson](https://github.com/rgson)
- [zwik](https://github.com/zwik)
- [TheLostSoul](https://github.com/TheLostSoul)    
- [echoenzo](https://github.com/echoenzo)
- [Ailuridaes](https://github.com/Ailuridaes)
- [ClairelyClaire](https://github.com/ClairelyClaire)

# Integration
POST `/api/import`     
CORS enabled endpoint which imports given save game file to the planner.     
Expects saveGame.xml or saveGame.zip as file parameter in the post. Please note that it implements regular zip format, not gzip.    
    
Note: This endpoint is rate limited to 600 requests per 15m (40 requests per minute)         
Note: saveGame.xml limit is 25mb    
      
Usage:      
`curl --form "file=@saveFile.xml" https://stardew.info/api/import`    
      
Response:     
```json
{
  "id": "readable-id-of-the-save",
  "absolutePath": "https://stardew.info/planner/readable-id-of-the-save"
}
```
     
Error response:     
```json 
{
  "message": "Missing file"
}
```

# Credits
- Background image exported from game by [/u/zaxcz](https://www.reddit.com/user/zaxcz)
- Building sizes and door locations by [/u/Jurk0wski](https://www.reddit.com/user/Jurk0wski)
- Base save importing code by [/u/ThisIsMyName777](https://www.reddit.com/user/ThisIsMyName777)
- All crops from all seasons by [ClairelyClaire](https://github.com/ClairelyClaire)
- Tons of suggestions, fixes, testing and ideas by **R3ality**
- Providing test save file with most of the items and ID's **Mai** from [#stardewvalley](irc://irc.freenode.net/stardewvalley)
- Being a cool guy and pointing me in the right direction with some coding stuff **TeMPOraL** from [#stardewvalley](irc://irc.freenode.net/stardewvalley)
- Helping to test and improve v2 version of the tool **speeder** from [#stardewvalley](irc://irc.freenode.net/stardew-modding)
- Sharing their epic farm saves [/u/ky13](https://www.reddit.com/user/ky13) & [/u/Halfbloood](https://www.reddit.com/user/Halfbloood)
- [Stardew Valley by](http://stardewvalley.net/) **[ConcernedApe](https://www.reddit.com/user/ConcernedApe)**

# License
Stardew Valley by ConcernedApe, Chucklefish LTD Copyright 2012     
Stardew Planner licensed under the [Apache License v2](https://github.com/hpeinar/stardewplanner/blob/master/LICENSE.md)
