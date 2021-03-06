## About

---

#### Background

The following work (which can be found at the HOME page by using the MENU bar at the top right) is meant to be a modern representation of Dr. John Snow'w famous cholera map of 1854. It was pivotal in allowing him to convince the relevant authorities that an outbreak was in fact happening. What's more, that there seemed to be a relationship to the pumps! Thus, with this evidence, Dr. Snow was able to improve the water sanitation and in doing so aid stop the epidemic. More information click [HERE](https://en.wikipedia.org/wiki/1854_Broad_Street_cholera_outbreak). A picture of the original map can be found [HERE](https://en.wikipedia.org/wiki/File:Snow-cholera-map-1.jpg). Also known as the Broad Street cholera outbreak or Golden Square cholera outbreak, the epidemic took the life of 616 people. From a modern day perspective, the visualization Dr. Snow generated has become a staple of effective data visualization and was far ahead of it's time.

#### Our Visualization

The visualization hopes to make Snow's original visual a bit more dynamic whilst showing some other attributes of the epidemic such as gender, age, and time. Thereafter, relating the newly associated attributes to time and location within the Cholera map.

## Design Process / Documentation

---

Before officially beginning the project I saught after to challenge myself. Not only is D3.js very new to me, but I more frequently see React.js used in the software industry. As such, my goal was to create these visualizations with React as the driver for d3. Come to find out it wasn't as simple as I expected, but it was a valueable learning process nevertheless. Using D3 and React together was the biggest challenge for the during the project.

#### About the Project

This project was initiated by Prof. Khairi Reda at IUPUI's class H517. All data was collected provided by him and provided to me. It can be found [HERE](https://khreda.com/teaching/2020/H517/project1). The purpose for the of the project was to practice d3 and create an interactive data visualization that represented a modernization of John Snow's famous 1854 Broad Street Cholera Outbreak map. All direction and base needs of the project were driver by Prof. Reda. The code base serving this project simply looks to feed this mission.

#### The Initial Design

An image of my original sketch can be found [HERE](https://ksmconsulting-my.sharepoint.com/:i:/p/aduran/EZHCYWVu7plLkMj5Wzd6LNgB1JSK9J0mhy1--c1SLWGxBQ?e=F4sIyp).

As can be seen, this is not where my final visual ended up, but there are reasons for this! The primary change between my initial design and the final version was that I had thought of making separate gender and age charts. But as it turned out, since deaths were the same it made no sense to have a single graph because the visual did not show us anything. So then I grouped age and gender into a single graph. This showed a much more interesting way of seeing things as compared to the initial proposal because it seemed the interaction between age and gender was more intersting than their separate representations. Additionally, I found it to be interesting to visualize how many people died as they were closer or further away from the pumps in terms of the units of the data.

#### The Colors

The best colors to use for this was relatively obvious as per [colorOracle](http://colororacle.org/). I went for some of the most neutral controls to color blinded people and remained neutral for the entirey of the visualization by staying consistent with the colors. I ended up using a collection of differnt tones found on this site: https://venngage.com/blog/color-blind-friendly-palette/

#### The Charts

It was obvious that I would at least have to have the map, but I had a bit more flexibility on the others! In total I had three charts. The Map (the cholera map) which is the center piece. The time related bar chart. The age and gender related bar chart.

- The Map

  - The map was the obvious center point of the project. It was important to label it even though it was obvious what it was as well as title it. Additionally, I wanted to allow users of the page to be able to identify who the people were in terms of age and gender give a point on the map. I accomplished this by generating a "map on tooltip" box at the top left of the page. You can also see obvious key location labeling such as the brewery and the golden square and street names. Additionally, At the very top there is a "Pump Distance Slider". In the units of the data given, it allows you to visualize how the outbreak grew spatially as it related to distance to the pumps!

- The Time Scatterplot

  - The Time Scatterplot gave us some insight into what occured within the map given a date range. I wanted it to be such that given a date you could see all of the people affected before the passing of that date and all the days before it. It was also really important to me to label the date associated with a bar (representing the number of deaths). Additionally, I made it such that if you wanted to view a specific date at a time -- you could do that by clicking the "Date Handler" button. You can set it back to less than or equal to that date by clicking the button again.

- Deaths by Age Range and Gender Barchart

  - By grouping on an x-location we are able to show the interaction of male to female given an age range really well which was a change I made as per the "inital design" section of this file. As you may also experience, if you hover over a particular bar on the chart -- it will filter to show the deaths associated to that bar in the map as well. Because this one doesn't have the "greater than" part to it -- like time does. I ended up not adding more ways to visualize on the map. At one point, I considered adding a button similar to that of the Date Handler such tht you could view by age range given a bucket or a gender across all buckets -- but it felt like a bit of overkill.

#### Peer Review

I had several coworkers review my visualizations and provide feedback. I made edits accordingly. One of the most frequent pieces of feedback I got was to add a line to the scatterplot, but it felt like kind of defeating the purpose of a scatter plot! So I did not add it. Also -- I shared with one of my peers my interest in making a "popup" for number of deaths on the map left given a filter given, but I couldn't find an elegant way to do this. It felt like the "popup" bothered the user more than anything. Had I found a way to fit it on the screen elegantly I would have.

## Findings

---

- The Male vs. Female interaction given an age

  - Something that was really interesting to me was that as seemed that females tended to die less except for when they were very young (minus the 41-60 age group). This kind of aligns with what would be expected during this time. Women tended to stay at home and little girls do go outside to play!

- The impact of age alone

  - Also as expected, on age independently, the youngest and oldest people died the most which aligns with our understanding of the human immune system.

- Concentration of people by gender on the map

  - Interestingly, if one pays close attention there seems to be that certain pump proximity had a gender preference. More women near pump "a" died in terms of ratio of men to women as compared to pump "b". It would be interesting to know why this might be the case -- but there seems to be some sort of association.

- Concentration of deaths on a given date

  - A lot of people seem to have passed away on a certain-date/ranges-of-dates! I'd be really intersted to know why this was the case. Can cholera in terms of the causing bacteria spike in concentration then suddnely come back down or what might have happened? Maybe there was a natioanl holiday or something within this town?

- The middle most pump

  - The middle most pump is very interesting (Broad Street pump) as it's really the only pump that had deaths at an exremely proximity to it. If you click "0.5" in the range slider, you will notice this. It's as if this pump had by far the most crazy of the impacts!
